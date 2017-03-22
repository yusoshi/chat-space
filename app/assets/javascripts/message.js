$(function() {
  function buildHTML(message) {
    var list = $('<li class="chat-main__messages-area__message-section__message-list">');
    var userName = $('.chat-main__footer__form___current-user-name').val();
    var userNameHTML = '<p class="chat-main__messages-area__message-section__message-list__head__name">' + userName + '</p>';
    var messageTimeHTML = '<p class="chat-main__messages-area__message-section__message-list__head__post-date">' + message.created_at + "</p>";
    var message_info = list.append('<div class="chat-main__messages-area__message-section__message-list__head">' + userNameHTML + messageTimeHTML + '</div>');
    var body = list.append('<p class="chat-main__messages-area__message-list__message">' + message.body + '</p>');

    return list
  }

  // メッセージ送信時に非同期通信を行う
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var textField = $('.chat-main__footer__form__textarea');
    var message = textField.val();

    // 現在のURLを取得
    var current_url = location.href;

    $.ajax({
      type: 'POST',
      url: current_url + '.json',
      data: {
        message: {
          body: message
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__messages-area__message-section').append(html);
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
  });
});
