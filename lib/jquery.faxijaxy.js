/* faxijaxy

   Appears to replace file inputs with clickable links. Auto-submits
   the forms using jquery.form.

   EXAMPLE
   
     jQuery.faxijaxy(function(data){
       // handle response
     })
   
   CSS
   
    .file_ajax:hover * {text-decoration:underline;}

*/
(function($){
  jQuery.faxijaxy = function(options, fn){
    if (jQuery.isFunction(options)){
      fn = options;
      options = null;
    }
    
    options = jQuery.extend({}, jQuery.faxijaxy.settings, options);
    var fields = jQuery('input[type=file]');
    
    var ajax_submit = function(e){
      e.preventDefault();
      var form = jQuery(this);
      var dataType = options['dataType']=='script' ? 'js' : options['dataType']
      var formOptions = {dataType: options['dataType'], success: e.data.success};
      
      form.prepend(jQuery('<input type="hidden" name="format" value="'+dataType+'"/>'));
      
      options['autoSubmit']==true ? form.ajaxSubmit(formOptions) : form.ajaxForm(formOptions);
    };
    
    fields.each(function(){
      var file = jQuery(this);
      var div = jQuery(document.createElement(options['wrapperTag'])).addClass(options['wrapperClass']).css('position','relative').insertBefore(file);
      var handle = jQuery(document.createElement(options['handleTag'])).html(options['handle']).css({'z-index':0}).appendTo(div);
      file.css({'opacity':0,'position':'absolute','top':0,'left':0,'z-index':100}).detach().appendTo(div);
      
      file.bind('change', function(){
        jQuery(this).parents('form').eq(0).submit();
      });
    });
    
    jQuery('form[enctype="multipart/form-data"]').has('input[type=file]').unbind('submit').bind('submit', { success: fn }, ajax_submit);
  };
  
  jQuery.faxijaxy.settings = {
    wrapperTag : 'div',
    wrapperClass : 'file_ajax',
    handleTag : 'div',
    handle : 'add a file',
    autoSubmit : true,
    dataType: 'json'
  }
  
  jQuery.faxijaxy.init = function(settings){
    jQuery.faxijaxy.settings = jQuery.extend({}, jQuery.faxijaxy.settings, settings);
  };
})(jQuery);