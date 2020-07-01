$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__message" data-message-id=${message.id}>
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
      `<div class="chat-main__message" data-message-id=${message.id}>
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
  let reloadMessages = function() {
    let last_message_id = $('.chat-main__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__messages').append(insertHTML);
        $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});