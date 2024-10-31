<?php

/**
 * Loads JavaScript and CSS style of the plugin.
 */
function rcw_load_assets()
{
    wp_enqueue_style("rcw-widget-style", plugins_url(). '/responsive-calendar-widget/assets/css/rcwstyle.css');

    wp_enqueue_script("rcw-widget-script", plugins_url(). '/responsive-calendar-widget/assets/js/rcwscript.js');
}

add_action('wp_enqueue_scripts', 'rcw_load_assets');