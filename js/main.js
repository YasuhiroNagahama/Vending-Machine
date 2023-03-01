const target = document.getElementById("target");
const leftContents = document.getElementById("left-contetns");
const rightContents = document.getElementById("right-contetns");
const imgList = document.getElementById("img-list");

class FishObject {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.pictureDictionary = {
      ヤマメ: "../img/ヤマメ.jpg",
      アマゴ: "../img/アマゴ.jpg",
      イワナ: "../img/イワナ.jpg",
      カワムツ: "../img/カワムツ.jpg",
      オイカワ: "../img/オイカワ.jpg",
      ウグイ: "../img/ウグイ.jpg",
      アユ: "../img/アユ.jpg",
      コイ: "../img/コイ.jpg",
      ニゴイ: "../img/ニゴイ.jpg",
      フナ: "../img/フナ.jpg",
      タナゴ: "../img/タナゴ.jpg",
      ナマズ: "../img/ナマズ.jpg",
      寿司職人: "../img/寿司職人.jpg",
      アカザ: "../img/アカザ.jpg",
      ウナギ: "../img/ウナギ.jpg",
      ドジョウ: "../img/ドジョウ.jpg",
      ニジマス: "../img/ニジマス.jpg",
      ブラックバス: "../img/ブラックバス.jpg",
      ブルーギル: "../img/ブルーギル.jpg",
      寿司: "../img/寿司.jpg",
    };
  }

  getHtmlContainertPhoto() {
    const imgWrap = document.createElement("div");
    imgWrap.classList.add(
      "l_contents_thumb-wrapper",
      "d-flex",
      "justify-content-center"
    );

    const img = document.createElement("img");
    img.classList.add("l_contents_thumb", "w-100", "slider-item");
    img.src = this.pictureDictionary[this.name];

    imgWrap.append(img);

    return imgWrap;
  }
}

const fishes = [
  new FishObject("ヤマメ", "300"),
  new FishObject("アマゴ", "300"),
  new FishObject("イワナ", "500"),
  new FishObject("カワムツ", "30"),
  new FishObject("オイカワ", "50"),
  new FishObject("ウグイ", "100"),
  new FishObject("アユ", "400"),
  new FishObject("コイ", "1000"),
  new FishObject("ニゴイ", "1200"),
  new FishObject("フナ", "800"),
  new FishObject("タナゴ", "600"),
  new FishObject("ナマズ", "2000"),
  new FishObject("寿司職人", "500000"),
  new FishObject("アカザ", "5000"),
  new FishObject("ウナギ", "3000"),
  new FishObject("ドジョウ", "10"),
  new FishObject("ニジマス", "250"),
  new FishObject("ブラックバス", "250"),
  new FishObject("ブルーギル", "150"),
  new FishObject("寿司", "10000"),
];

// 左側のコンテンツ（画像のリスト）をimgListに代入（d-noneを使い、見えなくしておく）
for (let i = 0; i < fishes.length; i++) {
  imgList.append(fishes[i].getHtmlContainertPhoto());
}

// sliderItem（画像）を取得
const sliderItems = document.querySelectorAll(".slider-item");

// スライドする際の画像を囲うdivを作成
const sliderShow = document.createElement("div");
// スライドする際に登場する画像を囲うdivを作成
const main = document.createElement("div");
// スライドする際に去っていく画像を囲うdivを作成
const extra = document.createElement("div");

sliderShow.classList.add(
  "animation-wrapper",
  "col-12",
  "d-flex",
  "flex-nowrap",
  "overflow-hiddens"
);
main.classList.add("main");
extra.classList.add("extra");

// あらかじめ登場する画像を代入しておく
main.append(sliderItems[0]);

sliderShow.append(main);
sliderShow.append(extra);
leftContents.append(sliderShow);

// 画像についての情報をまとめるdivを作成
const info = document.createElement("div");
info.classList.add("h5", "fw-bold", "mb-5", "rightContents-info");

const number = document.createElement("p");
number.innerHTML = "No.1";
const fishName = document.createElement("p");
fishName.innerHTML = "Name : " + fishes[0].name;
const price = document.createElement("p");
price.innerHTML = "Price : " + fishes[0].price;

info.append(number);
info.append(fishName);
info.append(price);

// buttonを囲うdivを作成
const buttonWrap = document.createElement("div");
buttonWrap.classList.add(
  "l_contents_button-wrapper",
  "d-flex",
  "justify-content-center",
  "align-items-center",
  "flex-wrap",
  "gap-4"
);

for (let i = 0; i < fishes.length; i++) {
  let button = document.createElement("button");
  button.classList.add(
    "l_contents_button",
    "fw-bold",
    "rounded",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );

  button.innerHTML = i + 1;
  buttonWrap.append(button);

  button.addEventListener("click", function () {
    slideJump(i);
  });
}

rightContents.append(info);
rightContents.append(buttonWrap);

// data-indexという属性を作り、その中身に画像のindexを入れておく
main.setAttribute("data-index", "0");

function slideJump(nextIndex) {
  // 現在のindexを保存
  const currentIndex = parseInt(main.getAttribute("data-index"));

  number.innerHTML = "No." + String(nextIndex + 1);
  fishName.innerHTML = "Name : " + fishes[nextIndex].name;
  price.innerHTML = "Price : " + fishes[nextIndex].price;

  // 現在のitem（画像）と次のitem（画像）を保存
  const currentElement = sliderItems.item(currentIndex);
  const nextElement = sliderItems.item(nextIndex);

  main.setAttribute("data-index", nextIndex.toString());

  const animationType = currentIndex < nextIndex ? "right" : "left";

  if (nextIndex != currentIndex) {
    animateMain(currentElement, nextElement, animationType);
  }
}

function animateMain(currentElement, nextElement, animationType) {
  main.innerHTML = "";
  main.append(nextElement);

  extra.innerHTML = "";
  extra.append(currentElement);

  main.classList.add("expand-animation");
  extra.classList.add("deplete-animation");

  if (animationType === "right") {
    sliderShow.innerHTML = "";
    sliderShow.append(extra);
    sliderShow.append(main);
  } else if (animationType === "left") {
    sliderShow.innerHTML = "";
    sliderShow.append(main);
    sliderShow.append(extra);
  }
}
