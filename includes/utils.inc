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
    '#required' => TRUE,
    '#element_validate' => array('accordion_rotator_form_validate'),
  );

  return system_settings_form($form);
}

/**
 * Validate user input on submission.
 *
 * @param unknown $element
 *   The form element to
 *   validate.
 */
function accordion_rotator_form_validate($element) {
  module_load_include('inc', 'islandora', 'includes/IslandoraTuque');
  module_load_include('inc', 'islandora', 'includes/datastream');

  $my_islandora_tuque = new IslandoraTuque();
  $repository = $my_islandora_tuque->repository;
  if (isset($element['#value'])) {
    $data_array = explode(',', $element['#value']);

    foreach ($data_array as $pid) {
      $fedora_object = islandora_object_load(str_replace(' ', '', $pid));
      if (!isset($fedora_object)) {
        form_set_error('accordion_pid_list', t('One or more of the provided PIDs is not valid.'));
      }
    }
  }
}
  /**
   * Callback to setup variables for the accordion.
   */
function accordion_rotator_canvas_setup($place) {

  module_load_include('inc', 'islandora', 'includes/IslandoraTuque');
  module_load_include('inc', 'islandora', 'includes/datastream');
  module_load_include('inc', 'islandora_paged_content', 'includes/utilities');

  global $base_url;
  // Get the configuration pids from this modules configuration page.
  $content = array();
  $pids_array = array();
  if ($place == 1) {
    $pids_array = explode(",", variable_get('accordion_pid_list'));
  }

  $fedora_object2 = islandora_object_load("islandora:sp_basic_image_collection");
  $rtdata = islandora_basic_collection_get_objects($fedora_object2, intval($place), 6);
  foreach ($rtdata as $members) {
    if (isset($members['object']['value'])) {
      if (!in_array($members['object']['value'], $pids_array)) {
        array_push($pids_array, $members['object']['value']);
      }
    }
  }
  // Safety Check.
  $fedora_object;
  if (!empty($pids_array)) {
    // Connect to our repository.
    $my_islandora_tuque = new IslandoraTuque();
    $repository = $my_islandora_tuque->repository;
    foreach ($pids_array as $pid) {
      // Load the associated fedora object by pid.
      $fedora_object = islandora_object_load($pid);

      // Check the objects existance, incase any faulty pids got past.
      // the configuration page validation.
      if ($fedora_object != NULL) {
        // Grab the DC Datastream's contents, gets description.
        $dc_object;
        if (isset($fedora_object['DC']->content)) {
          $dc = $fedora_object['DC']->content;
          $dc_object = DublinCore::importFromXMLString($dc);
        }

        $thumbnail_url = '';
        // Try to set the best quality image as the url.
        if (isset($fedora_object['TN'])) {
          $thumbnail_url = url($base_url . "/islandora/object/{$fedora_object->id}/datastream/TN/view");
        }
        // If MEDIUM_SIZE is available, use it instead.
        if (isset($fedora_object['MEDIUM_SIZE'])) {
          $thumbnail_url = url($base_url . "/islandora/object/{$fedora_object->id}/datastream/MEDIUM_SIZE/view");
        }
        // If JPEG is available, use it instead.
        if (isset($fedora_object['JPEG'])) {
          $thumbnail_url = url($base_url . "/islandora/object/{$fedora_object->id}/datastream/JPEG/view");
        }
        // Add this data as an entry to be displayed to the user as
        // an accordion block.
        $title = "";
        $description = "";
        
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
        'title' => $title,
        'description' => $description,
        'img_url' => $thumbnail_url,
        'link' => url($base_url . "/islandora/object/{$fedora_object->id}"),
        )
        );
      }
    }
  }
  // Fill sample data if there is nothing configured yet.
  if (empty($content)) {
    array_push($content, array(
    'title' => 'Test Title',
    'description' => 'This is a description. Replace with data stream description by
                        adding a comma seperated list of valid PIDs in this modules configuration page. ',
                          'img_url' => url($base_url . "/" . drupal_get_path('module', 'accordion_rotator') .
                          '/images/example_4/Depositphotos_4297654_XL.jpg'),
    )
    );
  }
  $results["content"] = $content;
  $json = json_encode($results);
  echo $json;
}
