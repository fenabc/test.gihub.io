document.addEventListener("DOMContentLoaded", function () {
  const zipcodeInput = document.getElementById("zipcode");
  const searchButton = document.getElementById("search-button");
  const addressResult = document.getElementById("address-result");

  searchButton.addEventListener("click", function () {
      const zipcode = zipcodeInput.value;
      if (zipcode.length !== 7) {
          alert("郵便番号は7桁で入力してください。");
          return;
      }

      // Japan PostのAPIを呼び出す
      fetch(`https://api.zipaddress.net/?zipcode=${zipcode}`)
          .then((response) => response.json())
          .then((data) => {
              if (data.code === 200) { // 基本status は 200
                  const address = data.data.fullAddress;
                  addressResult.textContent = `住所: ${address}`;
              } else { // エラー時には status 400(入力エラー) または 500(API内部で発生したエラー)
                  addressResult.textContent = "郵便番号が見つかりません。";
              }
          })
          .catch((error) => {
              console.error("API呼び出しエラー:", error);
          });
  });
});
