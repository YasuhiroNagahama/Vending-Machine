class Fish {
  // 魚の画像をオブジェクトとして保存
  static pictureDictionary = {
    ヤマメ: "img/ヤマメ.jpg",
    アマゴ: "img/アマゴ.jpg",
    イワナ: "img/イワナ.jpg",
    カワムツ: "img/カワムツ.jpg",
    オイカワ: "img/オイカワ.jpg",
    ウグイ: "img/ウグイ.jpg",
    アユ: "img/アユ.jpg",
    コイ: "img/コイ.jpg",
    ニゴイ: "img/ニゴイ.jpg",
    フナ: "img/フナ.jpg",
    タナゴ: "img/タナゴ.jpg",
    ナマズ: "img/ナマズ.jpg",
    寿司職人: "img/寿司職人.jpg",
    アカザ: "img/アカザ.jpg",
    ウナギ: "img/ウナギ.jpg",
    ドジョウ: "img/ドジョウ.jpg",
    ニジマス: "img/ニジマス.jpg",
    ブラックバス: "img/ブラックバス.jpg",
    ブルーギル: "img/ブルーギル.jpg",
    寿司: "img/寿司.jpg",
  };

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // HTML要素を作成し、魚の画像を設定するメソッド
  setFishImage() {
    const fishImgWrap = document.createElement("div");
    fishImgWrap.classList.add(
      "fish-img-wrapper",
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );

    const fishImg = document.createElement("img");
    fishImg.classList.add(
      "fish-img",
      "w-100",
      "border",
      "border-4",
      "border-dark",
      "rounded"
    );
    fishImg.src = Fish.pictureDictionary[this.name];
    fishImg.alt = this.name;

    fishImgWrap.append(fishImg);

    return fishImgWrap;
  }

  // 魚の画像を更新するメソッド
  updateFishImg(currentImg, nextImg, animationType) {
    const animationImgWrap = document.getElementById("animation-img-wrapper");
    const fishImgMain = document.getElementById("fish-img-main");
    const fishImgExtra = document.getElementById("fish-img-extra");

    // 現在の中身を空にする
    fishImgMain.innerHTML = "";
    fishImgExtra.innerHTML = "";

    fishImgMain.append(nextImg);
    fishImgExtra.append(currentImg);

    fishImgMain.classList.add("expand-animation");
    fishImgExtra.classList.add("deplete-animation");

    animationImgWrap.append(fishImgExtra);
    animationImgWrap.append(fishImgMain);

    if (animationType === "right") {
      animationImgWrap.append(fishImgExtra);
      animationImgWrap.append(fishImgMain);
    } else if (animationType === "left") {
      animationImgWrap.append(fishImgMain);
      animationImgWrap.append(fishImgExtra);
    }
  }

  // 魚の情報を更新するメソッド
  updateFishInfo(nextIndex) {
    document.getElementById("fish-number").innerHTML =
      "No." + String(nextIndex + 1);
    document.getElementById("fish-name").innerHTML =
      "Name : " + fishInfoList[nextIndex].name;
    document.getElementById("fish-price").innerHTML =
      "Price : " + fishInfoList[nextIndex].price;
  }

  // ボタンがクリックされた時の処理を行うメソッド
  buttonPushProcess(nextDataIndex, fishImgList) {
    const fishImgMain = document.getElementById("fish-img-main");
    const currentDataIndex = Number(fishImgMain.getAttribute("data-index"));

    if (currentDataIndex == nextDataIndex) return false;
    
    const currentImg = fishImgList.item(currentDataIndex);
    const nextImg = fishImgList.item(nextDataIndex);
    const animationType = currentDataIndex < nextDataIndex ? "right" : "left";

    fishImgMain.setAttribute("data-index", String(nextDataIndex));

    this.updateFishInfo(nextDataIndex);
    this.updateFishImg(currentImg, nextImg, animationType);
  }

  // ボタンがクリックされたときにbuttonPushProcessメソッドを呼び出すメソッド
  static buttonEvent() {
    const fishBtn = document.querySelectorAll(".fish-btn");
    const fishImgList = document.querySelectorAll(".fish-img");

    for (let i = 0; i < fishBtn.length; i++) {
      fishBtn[i].addEventListener("click", function () {
        fishInfoList[i].buttonPushProcess(i, fishImgList);
      });
    }
  }
}

// 魚の情報を配列で保存
const fishInfoList = [
  new Fish("ヤマメ", "300"),
  new Fish("アマゴ", "300"),
  new Fish("イワナ", "500"),
  new Fish("カワムツ", "30"),
  new Fish("オイカワ", "50"),
  new Fish("ウグイ", "100"),
  new Fish("アユ", "400"),
  new Fish("コイ", "1000"),
  new Fish("ニゴイ", "1200"),
  new Fish("フナ", "800"),
  new Fish("タナゴ", "600"),
  new Fish("ナマズ", "2000"),
  new Fish("寿司職人", "500000"),
  new Fish("アカザ", "5000"),
  new Fish("ウナギ", "3000"),
  new Fish("ドジョウ", "10"),
  new Fish("ニジマス", "250"),
  new Fish("ブラックバス", "250"),
  new Fish("ブルーギル", "150"),
  new Fish("寿司", "10000"),
];

// fishInfoListの各要素をsetFishImageメソッドに渡し、HTML要素にアペンドする関数
function displayFishImg() {
  const fishImgList = document.getElementById("fish-img-list");

  for (let i = 0; i < fishInfoList.length; i++) {
    fishImgList.append(fishInfoList[i].setFishImage());
  }
}

// 設定されている魚の情報分のボタンを作成する関数
function createFishBtn() {
  const buttonWrap = document.getElementById("fish-btn-wrap");

  for (let i = 0; i < fishInfoList.length; i++) {
    const button = document.createElement("button");
    button.classList.add(
      "fish-btn",
      "fw-bold",
      "rounded",
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );

    button.innerHTML = i + 1;
    buttonWrap.append(button);
  }

  Fish.buttonEvent();
}

displayFishImg();
createFishBtn();
