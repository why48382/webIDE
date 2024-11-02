let clicknum = 0;
$('.badge').on('click', function(){
  clicknum += 1;
  if(clicknum%2 == 1){
    $('.badge').html('Dark 🌙');

    $('#body').removeClass("dark");
    $('.navbar').removeClass('navbar-light bg-light')
    $('.navbar').addClass('navbar-dark bg-dark')
    $('.badge').removeClass("bg-dark");
    $('.badge').addClass("bg-light");
    $('.badge').removeClass("nav_light");
    $('.badge').addClass("nav_dark");
  } else {
    $('.badge').html('Light 🌞');

    $('#body').addClass("dark");
    $('.navbar').removeClass('navbar-dark bg-dark')
    $('.navbar').addClass('navbar-light bg-light')
    $('.badge').removeClass("bg-light");
    $('.badge').addClass("bg-dark");
    $('.badge').removeClass("nav_dark");
    $('.badge').addClass("nav_light");
  }
});
// Monaco Editor를 로드합니다.
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' }});
require(['vs/editor/editor.main'], function() {
    // 에디터 초기화
    let editor = monaco.editor.create(document.getElementById('editor'), {
        value: '// Write your code here...',
        language: 'plaintext',  // 기본 언어는 'plaintext'로 설정
        theme: 'vs-dark'        // 테마는 어두운 테마 사용
    });

    // Select box에서 파일 확장자가 변경되면 에디터 언어 변경
    document.getElementById('file-extension').addEventListener('change', function(event) {
        // 선택된 파일 확장자를 가져옴
        let selectedExtension = event.target.value;

        // 확장자에 따라 Monaco Editor에서 사용하는 언어로 매핑
        let extensionToLanguageMap = {
            'js': 'javascript',
            'py': 'python',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c'
        };

        // 선택된 확장자에 맞는 언어를 설정, 없으면 'plaintext'로 설정
        let language = extensionToLanguageMap[selectedExtension] || 'plaintext';
        monaco.editor.setModelLanguage(editor.getModel(), language);
    });


    // Copy to Clipboard 기능 구현
    document.getElementById('copy-button').addEventListener('click', function() {
        // 에디터에서 현재 코드를 가져옴
        let code = editor.getValue();

        // 클립보드로 복사
        navigator.clipboard.writeText(code).then(function() {
            alert("Code copied to clipboard!");
        }).catch(function(err) {
            console.error("Error copying text: ", err);
        });
    });
// 버튼 클릭시 포스트 방식으로 /save 컨트롤러 이용
    function saveData() {
        let code = editor.getValue();
        console.log(code);

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: code
        })
    }

    // 버튼 클릭 이벤트 핸들러
    document.getElementById("saveButton").addEventListener("click", saveData);

    // Ctrl + S 키보드 이벤트 핸들러
    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault(); // 브라우저의 기본 저장 동작 방지
            saveData();
        }
    });

});

window.addEventListener('resize', () => {
  if (editor) {
      editor.layout();  // 에디터의 layout 메서드를 호출해 크기를 업데이트
  }
});