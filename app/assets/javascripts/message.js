$(function() {
  function buildHTML(message) {
    var list = $('<li class="chat-main__messages-area__message-section__message-list">');
    // ユーザーネームの取得とHTMLと挿入
    var userName = $('.chat-main__footer__form___current-user-name').val();
    var userNameHTML = '<p class="chat-main__messages-area__message-section__message-list__head__name">' + userName + '</p>';
    // 投稿日時の取得とHTML挿入
    var messageTime1 = message.created_at.replace(/-/g, '/');
    var messageTime2 = messageTime1.replace('T', ' ');
    var messageTime3 = messageTime2.replace(/.\d\d\d.$/, '');

    var messageTimeHTML = '<p class="chat-main__messages-area__message-section__message-list__head__post-date">' + messageTime3 + "</p>";


    // メッセージ情報のHTML整形
    var message_info = list.append('<div class="chat-main__messages-area__message-section__message-list__head">' + userNameHTML + messageTimeHTML + '</div>');

    // 画像がある場合とない場合で場合分け
    if (message.image) {
      list.append('<p class="chat-main__messages-area__message-list__message">' + "<img src=" + message.image.thumb.url + ">" + "</p>");
    } else {
      list.append('<p class="chat-main__messages-area__message-list__message">' + message.body + '</p>');

  }

    return list
  }

  // メッセージ送信時に非同期通信を行う
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var textField = $('.chat-main__footer__form__textarea');
    var formData = new FormData($('form#new_message').get(0));

    // 現在のURLを取得
    var current_url = location.href;

    $.ajax({
      type: 'POST',
      url: current_url + ".json",
      data: formData,
      processData: false,
      contentType: false,
      async: true,
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
