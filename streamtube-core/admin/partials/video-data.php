<?php
/**
 *
 * The admin metabox template file.
 * 
 */
if( ! defined('ABSPATH' ) ){
    exit;
}
wp_enqueue_style( 'select2' );
wp_enqueue_script( 'select2' );
?>
<div class="metabox-wrap">

    <?php 
    /**
     * Fires before video metadata fields.
     *
     * @param $object $post
     */
    do_action( 'streamtube/core/admin/metabox/videodata/before', $post );
    ?>

    <?php if( ! is_wp_error( streamtube_core()->get()->license->is_verified() ) ): ?>

    <div class="field-group">
        <label for="disable_ad">
        
            <?php printf(
                '<input type="checkbox" name="disable_ad" id="disable_ad" class="input-field" %s>',
                $this->plugin()->post->is_ad_disabled() ? 'checked' : ''
            );?>
            <?php esc_html_e( 'Disable Advertising', 'streamtube-core' ); ?>
            
        </label>
    </div>    

    <div class="field-group">

        <label for="ad_schedules"><?php esc_html_e( 'Ad Schedules', 'streamtube-core' ); ?></label>

        <?php printf(
            '<select multiple="multiple" class="search-ads select-select2" id="ad_schedules" name="%s" data-placeholder="%s">',
            'ad_schedules[]',
            esc_html__( 'Search Ads', 'streamtube-core' )
        );?>

            <?php
            $ad_schedules = $this->plugin()->post->get_ad_schedules();

            if( $ad_schedules ){
                for ( $i=0; $i < count( $ad_schedules ); $i++) { 
                    if( $ad_schedules[$i] ){
                        printf(
                            '<option value="%1$s" selected>(#%1$s) %2$s</option>',
                            esc_attr( $ad_schedules[$i] ),
                            esc_html( get_the_title( $ad_schedules[$i] ) )
                        );
                    }
                }
            }
            ?>
        </select>
        <p class="description">
            <?php esc_html_e( 'Search Results only includes the Active Ads.', 'streamtube-core' );?>
        </p>        
    </div>

    <?php endif;?>

    <div class="field-group">
        <label for="video_url"><?php esc_html_e( 'Media Id', 'streamtube-core' ); ?></label>
        
        <?php printf(
            '<textarea name="video_url" id="video_url" class="regular-text input-field">%s</textarea>',
            esc_textarea( $this->plugin()->post->get_source() )
        );?>

        <p class="description">
            <?php esc_html_e( 'Upload a video file or paste a link/iframe code', 'streamtube-core' );?>
        </p>

        <button id="upload-file" type="button" class="button button-primary button-upload w-100" data-media-type="video" data-media-source="id">
            <?php esc_html_e( 'Upload a file', 'streamtube-core' );?>
        </button>                
    </div>

    <div class="field-groups">

        <div class="field-group">
            <label for="length"><?php esc_html_e( 'Video Length', 'streamtube-core' ); ?></label>

            <?php printf(
                '<input type="text" name="length" id="length" class="regular-text" value="%s">',
                esc_attr( $this->plugin()->post->get_length( $post->ID ) )
            );?>
        </div>

        <div class="field-group">
            <label for="aspect_ratio"><?php esc_html_e( 'Aspect Ratio', 'streamtube-core' ); ?></label>

            <select id="aspect_ratio" name="aspect_ratio" class="regular-text">

                <?php 

                $ratio_default = array(
                    '' =>  esc_html__( 'Default', 'streamtube-core' )
                );

                $ratios = streamtube_core_get_ratio_options();

                $ratios = array_merge( $ratio_default, $ratios );

                foreach ( $ratios as $key => $value ): ?>
                        
                        <?php printf(
                            '<option value="%s" %s>%s</option>',
                            esc_attr( $key ),
                            selected($this->plugin()->post->get_aspect_ratio( $post->ID ), $key, false ),
                            esc_html( $value )
                        );?>

                <?php endforeach ?>

            </select>
        </div>

    </div>

    <?php 
    /**
     * Fires after video metadata fields.
     *
     * @param $object $post
     */
    do_action( 'streamtube/core/admin/metabox/videodata/after', $post );
    ?>

    <?php
    wp_nonce_field( $this->nonce, $this->nonce );
    ?>
    <script type="text/javascript">
        jQuery(function () {
            jQuery( '.search-ads' ).select2({
                allowClear : true,
                minimumInputLength : 1,
                ajax : {
                    url : "<?php echo admin_url( 'admin-ajax.php' )?>",
                    delay: 250,
                    data: function (params) {
                        var query = {
                            s: params.term,
                            post_type : 'ad_schedule',
                            action: 'search_ads',
                            responseType : 'select2',
                            _wpnonce : '<?php echo wp_create_nonce( '_wpnonce' );?>'
                        }

                        return query;
                    },
                    processResults: function ( data, params ) {

                        params.page = params.page || 1;

                        return {
                            results: data.data.results,
                            pagination: {
                                more: (params.page * 20) < data.pagination
                            }                        
                        };
                    }                
                }
            });
        });
    </script>
</div>