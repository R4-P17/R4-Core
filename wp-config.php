<?php

//faire une detection du host et changer le file a inclure
define( 'WP_LOCAL_DEV', true );
include( dirname( __FILE__ ) . '/localhost-config.php' );

$table_prefix  = 'wp_';


if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/wp/');

define ('WP_CONTENT_FOLDERNAME', 'assets');

define ('WP_CONTENT_DIR', WP_CONTENT_FOLDERNAME) ;

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
