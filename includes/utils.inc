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
      $fedora_object = islandora_object_load($pid);
      if (!isset($fedora_object)) {
        form_set_error('accordion_pid_list', t('One or more of the provided PIDs is not valid.'));
      }
    }
  }
}
