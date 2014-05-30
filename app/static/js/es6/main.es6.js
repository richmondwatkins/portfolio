(function(){
  'use strict';

  $(document).ready(init);

  function init(){
  $('.form-edit').hide();
  $('body').on('click', '#show-edit', edit);
  }



  function edit(){

    $(this).next('.form-edit').slideToggle();

  }











})();
