var socket = io()

/* 접속되었을 때 실행 */
socket.on('connect', function(){

    /* 이름을 입력받고 */
    var name = prompt('반갑습니다!', '')

    /* 이름이 빈칸인 경우 */
    if(!name) {
        name = '익명'
    }

    /* 서버에 새로운 유저가 왔다고 알림 */
    socket.emit('newUser', name)
   })

socket.on('update', function(data){
    
    console.log(`${data.name}: ${data.message}`)
    
    receive(data);

})

    function send(){
        const message = document.getElementById('test').value
                
        //메시지 전송
        socket.emit('message', {type: 'message', message: message})

        //입력창 clear
        document.getElementById('test').value = ''      

    }

        /*
            $(document).on('click','div.input-div .sendbtn', function(e){
                e.preventDefault();                                 //e.preventDefault(초기값으로 변화 안되게)
                const message = document.getElementById('test').value
                        
                //메시지 전송
                sendMessage(message);
                socket.emit('message', {type: 'message', message: message})

                //입력창 clear
                document.getElementById('test').value = ''       
                });   
        */
        


/*메시지 수신 화면*/
    function receive(data){
        const LR = (data.name != "me")? "left" : "right";
        if(LR == "right"){
            appendMessageTag("right", data.name, data.message);
        }else{
            appendMessageTag("left", data.name, data.message);   
        }
    }

/*메시지 태그 생성*/
        function createMessageTag(LR_className, name, message){
            //형식 가져오기
            let chatLi = $('div.chat.format ul li').clone();               //clone()    (선택한 요소를 복제)

            //값 채우기
            chatLi.addClass(LR_className);
            chatLi.find('.sender span').text(name);
            chatLi.find('.message span').text(message);

            $('div.chat:not(.format) ul').append(chatLi);

            //스크롤바 아래 고정
            $('div.chat').scrollTop($('div.chat').prop('scrollHeight'));
}

        //메시지 태그 append
        function appendMessageTag(LR_className, name, message){
            const chatLi = createMessageTag(LR_className, name, message);
    
            $('div.chat:not(.format) ul').append(chatLi);
    
            //스크롤바 아래 고정
            $('div.chat').scrollTop($('div.chat').prop('scrollHeight'));
        }
