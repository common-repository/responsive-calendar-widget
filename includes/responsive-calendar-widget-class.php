<?php

/**
 * Adds ResponsiveCalendarWidget_Widget widget.
 */
class ResponsiveCalendarWidget_Widget extends WP_Widget
{

    const CALENDAR_WIDGET_DOMAIN = "rcw_domain";

    /**
     * Register widget with WordPress.
     */
    function __construct()
    {
        parent::__construct(
            'ResponsiveCalendarWidget_widget', // Base ID
            esc_html__('Responsive Calendar Widget', self::CALENDAR_WIDGET_DOMAIN), // Name
            array('description' => esc_html__('Display a responsive and user friendly calendar widget on your website.', self::CALENDAR_WIDGET_DOMAIN),) // Args
        );
    }

    /**
     * Front-end display of widget.
     *
     * @see WP_Widget::widget()
     *
     * @param array $args     Widget arguments.
     * @param array $instance Saved values from database.
     */
    public function widget($args, $instance)
    {
        echo $args['before_widget'];
        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }
        //Widget (Calendar) content
        echo '<div id="calendar-widget"></div>';
        echo '<script>loadCalendar(0, "' . $instance['selectedLanguage'] . '", "' . $instance['selectedStyle'] . '");</script>';
        echo $args['after_widget'];
    }

    /**
     * Back-end widget form.
     *
     * @see WP_Widget::form()
     *
     * @param array $instance Previously saved values from database.
     */
    public function form($instance)
    {
        $title = !empty($instance['title']) ? $instance['title'] : esc_html__('Calendar Widget Title', self::CALENDAR_WIDGET_DOMAIN);
        $selected_language = !empty($instance['selectedLanguage']) ? $instance['selectedLanguage'] : esc_html__('en', self::CALENDAR_WIDGET_DOMAIN);
        $selected_style = !empty($instance['selectedStyle']) ? $instance['selectedStyle'] : esc_html__('calendar-widget-lightgreen', self::CALENDAR_WIDGET_DOMAIN);
?>

        <!-- Widget Title -->
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>">
                <?php esc_attr_e('Title:', self::CALENDAR_WIDGET_DOMAIN); ?>
            </label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text" value="<?php echo esc_attr($title); ?>">
        </p>

        <!-- Language Selection -->
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('selectedLanguage')); ?>">
                <?php esc_attr_e('Language:', self::CALENDAR_WIDGET_DOMAIN); ?>
            </label>

            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('selectedLanguage')); ?>" name="<?php echo esc_attr($this->get_field_name('selectedLanguage')); ?>">
                <option value="en" <?php echo ($selected_language === 'en') ? 'selected' : ''; ?>>
                    English
                </option>
                <option value="de" <?php echo ($selected_language === 'de') ? 'selected' : ''; ?>>
                    Deutsch
                </option>
                <option value="fr" <?php echo ($selected_language === 'fr') ? 'selected' : ''; ?>>
                    français
                </option>
                <option value="zh" <?php echo ($selected_language === 'zh') ? 'selected' : ''; ?>>
                    中文
                </option>

            </select>
        </p>

        <!-- Style Selection -->
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('selectedStyle')); ?>">
                <?php esc_attr_e('Calendar Style:', self::CALENDAR_WIDGET_DOMAIN); ?>
            </label>

            <select class="widefat" id="<?php echo esc_attr($this->get_field_id('selectedStyle')); ?>" name="<?php echo esc_attr($this->get_field_name('selectedStyle')); ?>">
                <option value="calendar-widget-lightgreen" <?php echo ($selected_style === 'calendar-widget-lightgreen') ? 'selected' : ''; ?>>
                    Light Green
                </option>
                <option value="calendar-widget-orange" <?php echo ($selected_style === 'calendar-widget-orange') ? 'selected' : ''; ?>>
                    Orange
                </option>
                <option value="calendar-widget-violet" <?php echo ($selected_style === 'fr') ? 'calendar-widget-violet' : ''; ?>>
                    Violet
                </option>
            </select>
        </p>

<?php
    }

    /**
     * Sanitize widget form values as they are saved.
     *
     * @see WP_Widget::update()
     *
     * @param array $new_instance Values just sent to be saved.
     * @param array $old_instance Previously saved values from database.
     *
     * @return array Updated safe values to be saved.
     */
    public function update($new_instance, $old_instance)
    {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? sanitize_text_field($new_instance['title']) : '';
        $instance['selectedLanguage'] = (!empty($new_instance['selectedLanguage'])) ? strip_tags($new_instance['selectedLanguage']) : 'en';
        $instance['selectedStyle'] = (!empty($new_instance['selectedStyle'])) ? strip_tags($new_instance['selectedStyle']) : 'calendar-widget-lightgreen';
        return $instance;
    }
} // class ResponsiveCalendarWidget_Widget