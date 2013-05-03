<?php 
/**
 * @file
 * Theme template for the accordion rotator module
 */

?>
<div id="acc_data" class="acc_data" style="height: 100px">
  <?php $detail_count = 0; ?>
  <?php foreach ($block_data as $pid_block): ?>
    <div id="acc_content<?php print $detail_count; ?>" class="acc_content" transitionType="bottom" transitionTime="0.5" distance="30" delay="0" x="0" y="0" alignV="top">
      <div class="box">
       <p class="acc_title"><?php print $pid_block['title']; ?></p>
       <p class="text"><?php print $pid_block['description']; ?></p>
      </div>              
    </div>                          
   <?php $detail_count++; ?>
   <?php endforeach; ?>
</div>
<div id="acc_border">
   <div id="accordion3" class="accordion">
      <div class="acc_holder" id="acc_holder">
         <?php $block_count = 0; ?>
         <?php foreach ($block_data as $pid_block): ?>
            <div class="acc_block" id="acc_block<?php print $block_count; ?>">
              <div class="acc_content_holder" src=<?php print $pid_block['img_url']; ?>>
                 <div class="acc_image"></div>
              </div>
           </div>
         <?php $block_count++; ?>
         <?php endforeach; ?>
      </div>
   </div>
   <div class="previous accordion_button"
              normal= "<?php print $domain_url; ?>/images/ui/previous_button.png"
              over= "<?php print $domain_url; ?>/images/ui/previous_button_over.png">
   </div>
   <div class="next accordion_button"
              normal="<?php print $domain_url; ?>/images/ui/next_button.png"
              over="<?php print $domain_url; ?>/images/ui/next_button_over.png">
   </div>
</div>
