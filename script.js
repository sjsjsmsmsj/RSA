// Hàm tính ước chung lớn nhất (gcd) của hai số a và b
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Hàm tính nghịch đảo modulo (modInverse)
function modInverse(e, phi) {
    let t = 0, newT = 1;
    let r = phi, newR = e;
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
        privateKey: { d, n }
    };
}

// Hàm tạo khóa ngẫu nhiên
function generateRandomKeys() {
    const p = 61;
    const q = 53;
    return generateRSAKeys(p, q);
}

// Hàm ký văn bản (sử dụng private key)
function signMessage(message, privateKey) {
    const messageArray = message.split(" "); // Tách theo khoảng trắng
    const signature = messageArray.map((msg) => {
        const m = BigInt(msg); // Chuyển từng giá trị thành BigInt
        const d = BigInt(privateKey.d);
        const n = BigInt(privateKey.n);
        // Ký giá trị với private key: C = M^d mod n
        const signedValue = (m ** d % n).toString();
        return signedValue;
    });

    // Trả về chuỗi chữ ký (kết quả ký từng giá trị)
    return signature.join(" "); // Trả về kết quả chữ ký dưới dạng chuỗi
}

// Hàm xác thực chữ ký (sử dụng public key)
function verifySignature(message, signature, publicKey) {
    const messageArray = message.split(" ");
    const signatureArray = signature.split(" ");
    
    // Kiểm tra xem số lượng phần tử trong thông điệp và chữ ký có khớp hay không
    if (messageArray.length !== signatureArray.length) {
        return false; // Nếu không khớp, trả về false
    }

    const isValid = messageArray.every((msg, index) => {
        const m = BigInt(msg); // Mã ban đầu từ văn bản
        const s = BigInt(signatureArray[index]); // Mã đã ký
        const e = BigInt(publicKey.e); // Khóa công khai
        const n = BigInt(publicKey.n); // N
        const verifiedValue = s ** e % n; // Xác thực: M = C^e mod n

        // So sánh giá trị đã xác thực với thông điệp ban đầu
        return verifiedValue === m;
    });

    return isValid; // Nếu tất cả các phần tử khớp, trả về true, nếu không trả về false
}

// Lắng nghe sự kiện "Generate Keys"
document.getElementById("generateKeys").addEventListener("click", function() {
    const primeP = parseInt(document.getElementById("primeP").value);
    const primeQ = parseInt(document.getElementById("primeQ").value);

    if (isNaN(primeP) || isNaN(primeQ)) {
        alert("Please enter two valid prime numbers!");
        return;
    }

    const keys = generateRSAKeys(primeP, primeQ);
    document.getElementById("publicKey").value = `e: ${keys.publicKey.e}, n: ${keys.publicKey.n}`;
    document.getElementById("privateKey").value = `d: ${keys.privateKey.d}, n: ${keys.privateKey.n}`;
});

// Lắng nghe sự kiện "Generate Random Keys"
document.getElementById("generateRandomKeys").addEventListener("click", function() {
    const keys = generateRandomKeys();
    document.getElementById("publicKey").value = `e: ${keys.publicKey.e}, n: ${keys.publicKey.n}`;
    document.getElementById("privateKey").value = `d: ${keys.privateKey.d}, n: ${keys.privateKey.n}`;
});

// Lắng nghe sự kiện "Sign Message"
document.getElementById("signMessage").addEventListener("click", function() {
    const message = document.getElementById("messageToSign").value;
    const privateKey = {
        d: document.getElementById("privateKey").value.split(",")[0].split(":")[1].trim(),
        n: document.getElementById("privateKey").value.split(",")[1].split(":")[1].trim()
    };

    // Kiểm tra dữ liệu đã nhập
    if (!message) {
        alert("Please enter a message to sign.");
        return;
    }
    if (!privateKey.d || !privateKey.n) {
        alert("Private key is missing.");
        return;
    }

    // Ký thông điệp
    const signature = signMessage(message, privateKey);
    document.getElementById("signatureResult").value = signature;
});

// Lắng nghe sự kiện "Verify Signature"
document.getElementById("verifySignature").addEventListener("click", function() {
    const message = document.getElementById("messageToVerify").value.trim();
    const signature = document.getElementById("signatureToVerify").value.trim();

    // Lấy khóa công khai
    const publicKey = {
        e: document.getElementById("publicKey").value.split(",")[0].split(":")[1].trim(),
        n: document.getElementById("publicKey").value.split(",")[1].split(":")[1].trim()
    };

    // Kiểm tra dữ liệu đã nhập
    if (!message || !signature) {
        alert("Please enter both message and signature to verify.");
        return;
    }
    if (!publicKey.e || !publicKey.n) {
        alert("Public key is missing.");
        return;
    }

    // Xác thực chữ ký
    const isValid = verifySignature(message, signature, publicKey);
    
    // Hiển thị kết quả vào ô "verificationResult"
    const resultText = isValid ? "Signature is valid" : "Signature is invalid";
    document.getElementById("verificationResult").value = resultText;
});
