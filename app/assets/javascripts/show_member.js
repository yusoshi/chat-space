$(function() {
  // チェックされたユーザーをページ上に表示
  $('.chat-group-form__field--right input').change(function(e) {
    e.preventDefault();
    if ($(this).prop('checked')) {
      var userId = $(this).val();
      var forSelectingLabel = 'group_user_ids_' + userId;
      var forAddingClass = 'chat-group-user__names__' + userId;
      var userName = $('label[for=' + forSelectingLabel + ']').text()

      $('.chat-group-user__names').append('<li class=' + forAddingClass + '>' + userName);
    } else {
      // チェック外れたら表示を消す
      var userId = $(this).val();
      var forSelectingLabel = 'group_user_ids_' + userId;
      var forAddingClass = '.chat-group-user__names__' + userId;
      var list = $(forAddingClass);
      list.remove();
    }
  });
});
