<?php
/**
 * Plugin Name: Powering WordPress Search with React and REST API
 * Description: Replacing the search with React
 * Plugin URI: https://www.ibenic.com/wordpress-react-search
 */

if( ! defined( 'ABSPATH' ) ) {
    return;
}

add_action( 'wp_enqueue_scripts', 'wp_react_rest_api_scripts' );

/**
* Enqueueing the script
*/
function wp_react_rest_api_scripts() {
    wp_enqueue_script( 'react-rest-js', plugin_dir_url( __FILE__ ) . 'assets/js/public.min.js', array( 'jquery' ), '', true );
    wp_localize_script( 'react-rest-js', 'wp_react_js', array( 
      // Adding the post search REST URL
      'rest_search_posts' => rest_url( 'wp/v2/posts?search=%s' )));
}