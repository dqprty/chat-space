$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__message">
          <div class="message-box">
            <div class="message-box__name">
              ${message.user_name}
            </div>
            <div class="message-box__date">
              ${message.created_at}
            </div>
          </div>
          <div class="comment">
            <p class="comment-box">
              ${message.content}
            </p>
            <img class="comment__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__message">
        <div class="message-box">
          <div class="message-box__name">
            ${message.user_name}
          </div>
          <div class="message-box__date">
            ${message.created_at}
          </div>
        </div>
        <div class="comment">
          <p class="comment-box">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__messages').append(html);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('.form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});