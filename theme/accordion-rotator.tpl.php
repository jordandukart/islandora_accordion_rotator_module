<?php 
/**
 * @file
 * 
 */

?>
<div id="border">
   <div id="accordion3" class="accordion">
      <div class="holder">
         <?php foreach ($block_data as $pid_block): ?>
            <div class="block">
              <div class="content_holder" src=<?php print $pid_block['img_url']; ?>>
                 <div class="image"></div>
                 <div class="content" transitionType="bottom" transitionTime="0.5" distance="30" delay="0" x="0" y="0" alignV="bottom">
                    <div class="box"><p class="title"><?php print $pid_block['title']; ?></p><p class="text"><?php print $pid_block['description']; ?></p></div>
                 </div>
              </div>
           </div>
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