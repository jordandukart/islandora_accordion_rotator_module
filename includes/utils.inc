<?php

/**
 * @file
 * Holds the ajax callbacks for the rotator module.
 */

/**
 * Page callback: Accordion Rotator settings.
 */
function accordion_rotator_form($form, &$form_state) {
  $form['accordion_pid_list'] = array(
    '#type' => 'textfield',
    '#title' => t('A comma seperated list of PIDs to use for image data sources'),
    '#default_value' => variable_get('accordion_pid_list', ''),
    '#size' => 100,
    '#maxlength' => 200,
    '#element_validate' => array('accordion_rotator_form_validate'),
  );

  return system_settings_form($form);
}

/**
 * Validate user input on submission.
 *
 * @param array $element
 *   The form element to validate.
 */
function accordion_rotator_form_validate($element) {
  module_load_include('inc', 'islandora', 'includes/IslandoraTuque');
  module_load_include('inc', 'islandora', 'includes/datastream');

  if (isset($element['#value'])) {
    $data_array = explode(',', $element['#value']);
    $error_pids = array();
    foreach ($data_array as $pid) {
      $fedora_object = islandora_object_load(trim($pid));
      if (!$fedora_object) {
        $error_pids[] = $pid;
      }
    }
    if (count($error_pids)) {
      form_set_error('accordion_pid_list', t('The following pids are invalid: @pids', array('@pids' => implode(',', $error_pids))));
    }
  }
}
  /**
   * Callback to setup variables for the accordion.
   */
function accordion_rotator_canvas_setup() {
  module_load_include('inc', 'islandora', 'includes/datastream');
  // Get the configuration pids from this modules configuration page.
  $content = array();
  $pids_array = explode(",", variable_get('accordion_pid_list'));


  $fedora_object2 = islandora_object_load("islandora:sp_basic_image_collection");
  if ($fedora_object2 && count($pids_array) < 4) {
    $rtdata = islandora_basic_collection_get_member_objects($fedora_object2, 0, 4 - count($pids_array));
    foreach ($rtdata[1] as $members) {
      if (isset($members['object']['value'])) {
        if (!in_array($members['object']['value'], $pids_array)) {
          array_push($pids_array, $members['object']['value']);
        }
      }
    }
  }
  // Safety Check.
  if (!empty($pids_array)) {
    foreach ($pids_array as $pid) {
      // Load the associated fedora object by pid.
      $fedora_object = islandora_object_load($pid);

      // Check the objects existence, incase any faulty pids got past.
      // the configuration page validation.
      if ($fedora_object) {
        // Grab the DC Datastream's contents, gets description.
        if (isset($fedora_object['DC'])) {
          $dc = $fedora_object['DC']->content;
          $dc_object = DublinCore::importFromXMLString($dc);
        }

        $thumbnail_url = '';
        // Try to set the best quality image as the url.
        // If JPEG is available, use it instead.
        if (empty($thumbnail_url) && isset($fedora_object['JPEG'])) {
          $thumbnail_url = url("islandora/object/{$fedora_object->id}/datastream/JPEG/view", array(
            'absolute' => TRUE,
            'language' => NULL,
          ));
        }
        // If MEDIUM_SIZE is available, use it instead.
        if (empty($thumbnail_url) && isset($fedora_object['MEDIUM_SIZE'])) {
          $thumbnail_url = url("islandora/object/{$fedora_object->id}/datastream/MEDIUM_SIZE/view", array(
            'absolute' => TRUE,
            'language' => NULL,
          ));
        }
        if (empty($thumbnail_url) && isset($fedora_object['TN'])) {
          $thumbnail_url = url("islandora/object/{$fedora_object->id}/datastream/TN/view", array(
            'absolute' => TRUE,
            'language' => NULL,
          ));
        }

        // Add this data as an entry to be displayed to the user as
        // an accordion block.
        if (isset($dc_object->dc['dc:title'][0])) {
          $title = $dc_object->dc['dc:title'][0];
        }
        else {
          $title = "";
        }
        if (isset($dc_object->dc['dc:description'][0])) {
          $description = $dc_object->dc['dc:description'][0];
        }
        else {
          $description = '';
        }
        array_push($content, array(
          'title' => truncate_utf8($title, 30, FALSE, TRUE),
          'description' => truncate_utf8($description, 30, FALSE, TRUE),
          'img_url' => $thumbnail_url,
          'link' => url("islandora/object/{$fedora_object->id}"),
          )
        );
      }
    }
  }
  // Fill sample data if there is nothing configured yet.
  $content_count = count($content);
  if ($content_count < 4) {
    $default_value = array(
      'title' => t('Test Title'),
      'description' => t('This is a description. Click here to configure default PIDs.'),
      'img_url' => file_create_url(drupal_get_path('module', 'islandora') . '/images/folder.png'),
    );
    if (user_access('access administration pages')) {
      $default_value['link'] = url('admin/config/content/accordion_rotator');
    }
    $content += array_fill($content_count, 4 - $content_count, $default_value);
  }
  $results["content"] = $content;
  $json = json_encode($results);
  echo $json;
}
