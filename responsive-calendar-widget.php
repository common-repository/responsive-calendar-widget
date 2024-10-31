<?php

/**
 * Plugin Name: Responsive Calendar Widget
 * Version: 1.0
 * Plugin URI: https://github.com/a-dridi/Wordpress-Plugin_Responsive-Calendar-Widget
 * Description: A simple and modern calendar widget for your website.
 * Author: Abderraouf Dridi
 * Author URI: https://dev.ard.ovh/
 * Requires at least: 3.0
 * Tested up to: 3.0
 *
 * Text Domain: responsive-calendar-widget
 * Domain Path: /lang/
 *
 * @package WordPress
 * @author Abderraouf Dridi
 * @since 1.0
 */

if (!defined('ABSPATH')) {
	exit;
}


require_once(plugin_dir_path(__FILE__) . '/includes/responsive-calendar-widget-loader.php');

require_once(plugin_dir_path(__FILE__) . '/includes/responsive-calendar-widget-class.php');


function register_responsivecalendarwidget()
{
	register_widget('ResponsiveCalendarWidget_Widget');
}

add_action('widgets_init', 'register_responsivecalendarwidget');
