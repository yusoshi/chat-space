$(function() {

  // TODO: 追加ボタン押すとメンバに追加できる
  //       削除できる
  //       同じ名前の人を何回も出さないようにする(げ・ん・きってうつと…)
  //       ログイン中のユーザーは表示されない＆削除できない
  //       検索候補から外れたユーザーを検索候補から消す

  // ユーザーの検索結果と「追加」ボタンを表示
  function userList(lists) {
    $(lists).each(function(i, list) {
      var ul = $('.chat-group-form__field--right__user-search-result');
      var li = $('<li class="chat-group-form__field--right__user-search-result__list .clearfix">');
      var addName = li.append('<class="chat-group-form__field--right__user-search-result__list__name .clearfix">' + list);
      var addBtn = li.append('<a href="", class="chat-group-form__field--right__user-search-result__add-btn">追加</a>');
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
})
