<?php
/*
Plugin Name: Dice Roller
Description: Dice roller designed for table top RPGs.
*/

defined('ABSPATH') or die('Plugin file cannot be accessed directly.');

if (!class_exists('DiceRoller')) {

	class DiceRoller {

		/**
		 * Set up the plugin.
		 */
		function __construct() {
			add_shortcode('dice_roller', [$this, 'shortcode']);
		}

		/**
		 * Set up the shortcode.
		 *
		 * @param	array	$atts		Attributes
		 * @param	string 	$content	Content passed in to the shortcode
		 * @return	string				Shortcode output
		 */
		function shortcode($atts, $content = null) {
			$this->enqueue_js();
			ob_start();
			require_once('form/form.html');
			$html = ob_get_clean();
			return $html;
		}

		/**
		 * Register scripts with WordPress.
		 */
		function enqueue_js() {
			if (!wp_script_is('dice_roller', 'enqueued')) {
				wp_register_script(
					'dice_roller',
					plugin_dir_url(__FILE__) . 'js/dice.js'
				);
				wp_enqueue_script('dice_roller');
			}
		}

	} // End class

} // End if(!class_exists)

if (!class_exists('DiceRollerWidget')) {

	class DiceRollerWidget extends WP_Widget{

		/**
		 * Set up the widget in the menu.
		 */
		function __construct() {
			parent::__construct(
				'dice_roller',
				'Dice Roller',
				['description' => 'Dice roller for table top RPGs']
			);
		}

		/**
		 * Register scripts with WordPress.
		 */
		function enqueue_js() {
			if (!wp_script_is('dice_roller', 'enqueued')) {
				wp_register_script(
					'dice_roller',
					plugin_dir_url(__FILE__) . 'js/dice.js'
				);
				wp_enqueue_script('dice_roller');
			}
		}

		/**
		 * Runs the widget code.
		 */
		function widget($args, $instance) {
			$this->enqueue_js();
			require_once('form/form-widget.html');
		}

	} // End class

} // End if(!class_exists)

if (class_exists('DiceRoller')) {
	new DiceRoller();
}

if (class_exists('DiceRollerWidget')) {
	function register_dice_roller_widget() {
		register_widget('DiceRollerWidget');
	}
	add_action('widgets_init', 'register_dice_roller_widget');
}
