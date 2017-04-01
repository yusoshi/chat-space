$(function() {

  // todo list
  // @@ = done, @ = WIP

  // @@追加ボタン押すと下に表示される
  // @@Saveボタンを押すと非同期通信でグループ情報を送信
  // @@削除できる
  // @@同じ名前の人を何回も出さないようにする(げ・ん・きってうつと…)
  // @@検索候補から外れたユーザーを検索候補から消す
  // editのときにすでにグループに所属しているユーザーを表示する


  // ユーザーの検索結果と「追加」ボタンを表示
  function userList(lists) {
    $(lists).each(function(i, list) {
      var div1 = $('.chat-group-form__field--right__user-search-result');
      var div2 = $('<div class="chat-group-user chat-group-user-search clearfix">');
      var addName = div2.append('<p class="chat-group-user__name">' + list.name);
      var addBtn = div2.append('<a class="chat-group-user__btn chat-group-user__btn--add" user_id=' + list.id + ' user_name=' + list.name +'>追加</a>');
      var div1WithName = div1.append(addName);
      var div1WithNameAndBtn = div1.append(div1WithName);
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
        url: '/groups/search',
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
    var userId = $(this).attr('user_id');
    var userName = $(this).attr('user_name');

    var div1 = $('#chat-group-users');
    var div2 = $('<div class="chat-group-user clearfix">');
    var addInput = div2.append('<input type="hidden", name="group[users_id][]", id="chat-group-user-' + userId + '", value=' + userId + '>');
    var addName = div2.append('<p class="chat-group-user__name">' + userName);
    var addBtn = div2.append('<a class="chat-group-user__btn chat-group-user__btn--remove" user_id=' + userId + ' user_name=' + userName +'>削除</a>');
    var div1WithName = div1.append(addName);
    var div1WithNameAndBtn = div1.append(div1WithName);
    $(this).parent().remove();
  });

  // 削除機能
   $(document).on('click', '.chat-group-user__btn--remove', function() {
    $(this).parent().remove();
   })

  // Saveボタンを押すと非同期通信でグループ情報を送信
  $('#new_group').on('submit', function(e) {
    e.preventDefault();
    var currentUrl = location.href;

    var user_ids = [];
    $('.chat-group-user').each(function() {
      user_ids.push($('chat-group-user__btn--remove').attr('user_id'))
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
});
