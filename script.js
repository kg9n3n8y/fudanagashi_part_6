document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("dblclick", function(e) { e.preventDefault(); }, { passive: false });

    // 流す札の枚数をここに入力
    const allFuda = 13;

    // 札を混ぜる
    let fudaOrder = [...fudalist];
    fudaOrder = shuffleArray(fudaOrder)

    let startTime;
    let currentFuda = 0;

    // プリロードされた画像を保持する配列
    const preloadedImages = {};

    // 画像のプリロード処理
    function preloadImages() {
        // 初期画像
        const initialImage = new Image();
        initialImage.src = './torifuda/tori_0.png';
        preloadedImages['./torifuda/tori_0.png'] = initialImage;

        // 全ての札の表裏画像をプリロード
        fudalist.forEach(fuda => {
            const normalImage = new Image();
            normalImage.src = fuda.normal;
            preloadedImages[fuda.normal] = normalImage;

            const reverseImage = new Image();
            reverseImage.src = fuda.reverse;
            preloadedImages[fuda.reverse] = reverseImage;
        });
    }

    // DOM読み込み時に画像をプリロード
    preloadImages();

    // HTML要素の取得
    const imageElement = document.getElementById('random-image');
    const reloadButton = document.getElementById('reload-button');
    const kimariji = document.getElementById('kimariji');
    const kimarijiButton = document.getElementById('kimariji-button');

    // 決まり字の表示
    kimarijiButton.addEventListener('click', function() {
        kimariji.style.color = '#CC0000'; // 赤色に変更
    });

    // 配列をシャッフルする
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // タイマーの停止・リセット
    function stopTimer() {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        alert(`終わりです。${minutes}分${remainingSeconds}秒でした！`);

        resetPage();
    }

    // 最初からボタンクリック時のイベント
    function reloadPage(){
        let flag = window.confirm("最初の状態に戻りますが、いいですか？");
        if(flag) {
            resetPage();
        }
    }

    // 状態のリセット
    function resetPage(){
        imageElement.src = './torifuda/tori_0.png';
        kimariji.textContent = '　';
        kimariji.style.color = '#E1DAC3'; // 元の色に戻す
        currentFuda = 0;
        fudaOrder = shuffleArray(fudaOrder);
    }   

    // 札リストから選ばれた札を表示
    function displayFuda(order) {
        const fuda = fudaOrder[order];
        const isFlipped = Math.random() < 0.5;
        imageElement.src = isFlipped ? fuda.reverse : fuda.normal;
        document.getElementById('kimariji').textContent = fuda.kimariji;
    }

    // 画像クリック時のイベント
    imageElement.addEventListener('click', () => {
        if (currentFuda === 0) {
            startTime = Date.now();
            displayFuda(currentFuda);
            currentFuda++;
        } else if (currentFuda === allFuda) {
            stopTimer();
        } else {
            displayFuda(currentFuda);
            currentFuda++;
        }

        kimariji.style.color = '#E1DAC3'; // 元の色に戻す
    });

    // 最初からボタンクリックでリロードイベント
    reloadButton.addEventListener('click', reloadPage);
});