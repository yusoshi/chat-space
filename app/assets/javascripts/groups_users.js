$(function() {

  // ユーザーの検索結果と「追加」ボタンを表示
  function userList(lists) {
    $(lists).each(function(i, list) {
      var div = $(`.chat-group-form__field--right__user-search-result`);
        div.append(
          `<div class="chat-group-user chat-group-user-search clearfix">
            <p class="chat-group-user__name">${list.name}</p>
            <a class="chat-group-user__btn chat-group-user__btn--add" data-user-id=${list.id} data-user-name=${list.name} >追加</a>`);
    });
  }

  // ユーザー名でインクリメンタルサーチ
  var preWord;
  $('#chat-group-form__input__user').on('keyup', function(e) {
    e.preventDefault();
    var query = $(this).val();

    if (query != preWord && query.length !== 0) {
      $('.chat-group-user-search').remove();
      preWord = query;
      // ajax処理
      $.ajax({
        type: 'GET',
        url: '/users/search',
        data: {
          q: query
        }
      })
      .done(function(data) {
        userList(data.lists);
      })
      .fail(function() {
        alert('検索に失敗しました。');
      })
    }
  });

  // 追加ボタンを押すと追加予定メンバーとして表示される
  $(document).on('click', '.chat-group-user__btn--add', function(e) {
    e.preventDefault();
    var userId = $(this).attr('data-user-id');
    var userName = $(this).attr('data-user-name');

    var div = $('#chat-group-users');
    div.append(`
      <div class="chat-group-user clearfix">
        <input type="hidden" name="group[users_id][]" id="chat-group-user-${userId}" value=${userId}
        <p class="chat-group-user__name">${userName}
        <a class="chat-group-user__btn chat-group-user__btn--remove" data-user-id=${userId} data-user-name=${userName}>削除</a>`);
    $(this).parent().remove();
  });

  // 削除機能
   $(document).on('click', '.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
   })

  // Saveボタンを押すと非同期通信でグループ情報を送信(新規作成)
  $('.new_group').on('submit', function(e) {
    e.preventDefault();
    var user_ids = [];
    $('.chat-group-user').each(function() {
      user_ids.push($(this).find('input').val());
    });
    var name = $('#chat_group_name').val();

    $.ajax({
      type: 'POST',
      url: '/groups.json',
      data: {
        group: {
          name: name,
          user_ids: user_ids
        }
      }
    })
    .done(function(data) {
      window.location.href = "/groups/" + data.id + "/messages";
    })
    .fail(function() {
      alert('送信に失敗しました。')
    })
  });

  // Saveボタンを押すと非同期通信でグループ情報を送信(編集時)
  $('.edit_group').on('submit', function(e) {
    e.preventDefault();
    var user_ids = [];
    $('.chat-group-user').each(function() {
      user_ids.push($(this).find('input').val());
    });
    var name = $('#chat_group_name').val();

    var currentUrl = location.href;
    var groupId = currentUrl.match(/\/(\d\d)\//)[1];

    $.ajax({
      type: 'PATCH',
      url: '/groups/' + groupId +'.json',
      data: {
        group: {
          name: name,
          user_ids: user_ids
        }
      }
    })
    .done(function(data) {
      window.location.href = "/groups/" + data.id + "/messages";
    })
    .fail(function() {
      alert('送信に失敗しました。')
    })
  });
});
