$(function() {

  // todo list
  // @@ = done, @ = WIP

  // @@追加ボタン押すと下に表示される
  // Saveボタンを押すと非同期通信でグループ情報を送信
  // 削除できる
  // 追加の重複をなくす
  // 同じ名前の人を何回も出さないようにする(げ・ん・きってうつと…)
  // ログイン中のユーザーは表示されない＆削除できない
  // 検索候補から外れたユーザーを検索候補から消す


  // ユーザーの検索結果と「追加」ボタンを表示
  function userList(lists) {
    $(lists).each(function(i, list) {
      var ul = $('.chat-group-form__field--right__user-search-result');
      var li = $('<li class="chat-group-form__field--right__user-search-result__list clearfix">');
      var addName = li.append('<p class="chat-group-form__field--right__user-search-result__list__name">' + list.name);
      var addBtn = li.append('<a class="chat-group-form__field--right__user-search-result__add-btn", user_id="' + list.id + '", ' + 'user_name=' + list.name +'>追加</a>');
      var ulWithName = ul.append(addName);
      var ulWithNameAndBtn = ul.append(ulWithName);
    });
  }

  // ユーザー名でインクリメンタルサーチ
  var preWord;
  $('#chat-group-form__input__user').on('keyup', function(e) {
    e.preventDefault();
    var query = $(this).val();

    if (query != preWord && query.length !== 0) {
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
  $(document).on('click', 'li a', function(e) {
    e.preventDefault();
    var userId = $(this).attr('user_id');
    var userName = $(this).attr('user_name');

    // var ul = $('.chat-group-user__name');
    // var li = $('<li class="chat-group-user__name__names">');

    $('.chat-group-user__name').append('<li class="chat-group-user__name__names">' + userName);
  });





});
