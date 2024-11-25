// Hàm kiểm tra số nguyên tố 
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
          return false; 
      }
  }
  return true; 
}
// Hàm tính ước chung lớn nhất (gcd) của hai số a và b
// tìm e
function gcd(a, b) {
while (b !== 0) {
  let temp = b;
  b = a % b;
  a = temp;
}
return a;
}

// Hàm tính nghịch đảo modulo (modInverse)
// tìm d
function modInverse(e, phi) {
let t = 0,
  newT = 1;
let r = phi,
  newR = e;
while (newR !== 0) {
  let quotient = Math.floor(r / newR);
  let tempT = t;
  t = newT;
  newT = tempT - quotient * newT;
  let tempR = r;
  r = newR;
  newR = tempR - quotient * newR;
}
if (r > 1) return null; // Không có nghịch đảo
if (t < 0) t = t + phi; // Đảm bảo t dương
return t;
}

// Hàm sinh số ngẫu nhiên trong phạm vi [2, phi-1]
function getRandomNumber(phi) {
return Math.floor(Math.random() * (phi - 2)) + 2;
}

// Hàm tạo khóa RSA
function generateRSAKeys(p, q) {
const n = p * q;
const phi = (p - 1) * (q - 1);

let e;
do {
  e = getRandomNumber(phi);
} while (gcd(e, phi) !== 1);

const d = modInverse(e, phi);
return {
  publicKey: { e, n },
  privateKey: { d, n },
};
}

// Hàm tạo khóa ngẫu nhiên
function generateRandomKeys() {
const p = 61;
const q = 53;
return generateRSAKeys(p, q);
}


// Hàm ký văn bản (sử dụng private key)
async function signMessage(message, privateKey) {
const hashedMessage = await hashMessage(message);
  console.log("Hashed Message (Decimal):", hashedMessage);

  // Chuyển đổi chuỗi băm thành mảng các ký tự
  const messageArray = Array.from(hashedMessage); 

  // Tạo chữ ký cho mỗi phần tử trong mảng băm
  const signature = messageArray.map((msg) => {
    const m = BigInt(msg); 
    const d = BigInt(privateKey.d);
    const n = BigInt(privateKey.n);

    // Ký giá trị với private key: C = M^d mod n
    const signedValue = (m ** d % n).toString();
    return signedValue;
  });

  const a = signature.join(" ").toString();
  return a; 

}


function verify(signature, publicKey) {
    const signatureArray = signature.split(" ");
    const originalMessage = signatureArray.map((signedValue) => {
        const s = BigInt(signedValue);
        const e = BigInt(publicKey.e);
        const n = BigInt(publicKey.n);
        const originalValue = s ** e % n; // Xác thực: M = C^e mod n
        return originalValue.toString(); 
    });
    return originalMessage.join("");
}


async function verifySignature(message, signature, publicKey) {
const originalMessage = verify(signature, publicKey).toString();
const hashedMessage = (await hashMessage(message)).toString();

// const hashedMessage = hashMessage(message);
const messageArray = Array.from(hashedMessage);
console.log("giải mã",  originalMessage);
console.log("băm 2",  hashedMessage);
console.log("băm array",messageArray);
console.log("Comparison Result:", originalMessage === hashedMessage);
if (originalMessage === hashedMessage)
  return true;
else 
  return false;
}



//===================================

// Lắng nghe sự kiện "Generate Keys"
document.getElementById("generateKeys").addEventListener("click", function () {
const primeP = parseInt(document.getElementById("primeP").value); // lấy giá trị nhập P
const primeQ = parseInt(document.getElementById("primeQ").value); // lấp giá trị nhập q

if (isNaN(primeP) || isNaN(primeQ)) {
  alert("Please enter two numbers!"); 
  return;
}

if (!isPrime(primeP)|| !isPrime(primeQ)){
  alert("Please enter two valid prime numbers!"); 
  return;
}

const keys = generateRSAKeys(primeP, primeQ); // tạo khóa
document.getElementById(
  "publicKey"
).value = `e: ${keys.publicKey.e}, n: ${keys.publicKey.n}`;
document.getElementById(
  "privateKey"
).value = `d: ${keys.privateKey.d}, n: ${keys.privateKey.n}`;
});

// Lắng nghe sự kiện "Generate Random Keys"
document
.getElementById("generateRandomKeys")
.addEventListener("click", function () {
  const keys = generateRandomKeys();
  document.getElementById(
    "publicKey"
  ).value = `e: ${keys.publicKey.e}, n: ${keys.publicKey.n}`;
  document.getElementById(
    "privateKey"
  ).value = `d: ${keys.privateKey.d}, n: ${keys.privateKey.n}`;
  document.getElementById("primeP").value = `61`;
  document.getElementById("primeQ").value = `53`;
});



// Lắng nghe sự kiện chọn file
document.getElementById("fileToSign").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) {
    alert("Please select a file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const fileContent = e.target.result; // Nội dung file
    document.getElementById("messageToSign").value = fileContent; // Đặt nội dung vào textarea
  };
  reader.readAsText(file); // Đọc file dưới dạng văn bản
});


document.getElementById("fileToVerify").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) {
    alert("Please select a file to verify.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const fileContent = e.target.result; // Lấy nội dung file
    console.log("File content:", fileContent); // In nội dung file ra console để kiểm tra

    try {
      // Nội dung của file sẽ được sử dụng trực tiếp làm message và signature
      const lines = fileContent.split("\n").map((line) => line.trim());
      
      // Dùng tất cả các dòng trong file làm message và chữ ký
      let message = lines[0]; // Dòng đầu tiên là message
      let signature = lines.slice(1).join(" "); // Các dòng còn lại là chữ ký

      // Đặt giá trị vào các trường input
      document.getElementById("messageToVerify").value = message;
      document.getElementById("signatureToVerify").value = signature;
    } catch (error) {
      alert("Error: " + error.message); // Hiển thị lỗi chi tiết
      console.error("File processing error:", error); // In lỗi ra console để xem chi tiết
    }
  };

  reader.readAsText(file); // Đọc file dưới dạng văn bản
});


// Lắng nghe sự kiện "Sign Message"
document.getElementById("signMessage").addEventListener("click",async function () {
try {
  // Kiểm tra dữ liệu đã nhập
  const privateKeyString = document.getElementById("privateKey").value;
  if (!privateKeyString) throw new Error("Private key is missing.");

  let privateKey = {
    d: privateKeyString.split(",")[0].split(":")[1].trim(),
    n: privateKeyString.split(",")[1].split(":")[1].trim(),
  };

  if (!privateKey.d || !privateKey.n) {
    throw new Error("Private key is incomplete.");
  }

  let message = document.getElementById("messageToSign").value;
  if (!message) {
    throw new Error("Please enter a message to sign.");
  }

  // Ký thông điệp
  const signature = await signMessage(message, privateKey);
  document.getElementById("signatureResult").value = signature;


  
} catch (error) {
  alert(error.message);
  return;
}
});

// Lắng nghe sự kiện "Verify Signature"
document.getElementById("verifySignature").addEventListener("click",async  function () {
  try {
    // Lấy khóa công khai 
    const publicKeyElement = document.getElementById("publicKey").value;
  if (!publicKeyElement) throw new Error("Public key input is missing.");

  let publicKey = {
    e: publicKeyElement.split(",")[0].split(":")[1].trim(),
    n: publicKeyElement.split(",")[1].split(":")[1].trim(),
  };

  if (!publicKey.e || !publicKey.n) {
    throw new Error("Public key is incomplete.");
  }


    // Kiểm tra dữ liệu đã nhập
    const message = document.getElementById("messageToVerify").value.trim();
    const signature = document
      .getElementById("signatureToVerify")
      .value.trim();
    
    if (!message || !signature) {
      throw new Error("Please enter both message and signature to verify.");
    }

    // Xác thực chữ ký
    const isValid = await  verifySignature(message, signature, publicKey);

    // Hiển thị kết quả vào ô "verificationResult"
    const resultText = isValid ? "Signature is valid" : "Signature is invalid";
    document.getElementById("verificationResult").value = resultText;
  } catch (error) {
    alert(error.message); 
  }
});


async function hashMessage(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // Băm thông điệp bằng Web Crypto API
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Chuyển đổi kết quả băm thành chuỗi hex
  const hashArray = Array.from(new Uint8Array(hashBuffer));
const hashNumbers = hashArray.map(byte => byte.toString()).join("");

return hashNumbers;
}

