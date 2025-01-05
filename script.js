document.addEventListener("DOMContentLoaded", function () {
    // Simulasi penyimpanan pengguna
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Fungsi daftar pengguna
    const registerForm = document.getElementById("formRegister");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const user = { fullName, email, username, password };
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registrasi berhasil! Silakan login.");
            window.location.href = "index.html";
        });
    }

    // Fungsi login pengguna
    const loginForm = document.getElementById("formLogin");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("loginUsername").value;
            const password = document.getElementById("loginPassword").value;

            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                alert("Login berhasil!");
                window.location.href = "home.html";
            } else {
                alert("Username atau password salah!");
            }
        });
    }

    // Fungsi logout pengguna
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            alert("Anda telah logout.");
            window.location.href = "index.html";
        });
    }

    // Menampilkan profil pengguna
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        const userFullName = document.getElementById("userFullName");
        const userEmail = document.getElementById("userEmail");
        const userUsername = document.getElementById("userUsername");

        if (userFullName) userFullName.textContent = loggedInUser.fullName;
        if (userEmail) userEmail.textContent = loggedInUser.email;
        if (userUsername) userUsername.textContent = loggedInUser.username;
    }

    

    // Fungsi tambah transaksi
    const transactionForm = document.getElementById("formTransaksi");
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    if (transactionForm) {
        transactionForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const namaTransaksi = document.getElementById("namaTransaksi").value;
            const jumlah = document.getElementById("jumlah").value;
            const kategori = document.getElementById("kategori").value;

            const newTransaction = {
                namaTransaksi,
                jumlah,
                kategori,
                tanggal: new Date().toLocaleDateString()
            };

            transactions.push(newTransaction);
            localStorage.setItem("transactions", JSON.stringify(transactions));
            alert("Transaksi berhasil disimpan!");
            window.location.reload();
        });
    }

    // Menampilkan daftar transaksi
    const daftarTransaksi = document.getElementById("daftarTransaksi");
    if (daftarTransaksi) {
        const tbody = daftarTransaksi.querySelector("tbody");
        tbody.innerHTML = "";

        if (transactions.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5">Belum ada transaksi.</td></tr>`;
        } else {
            transactions.forEach((transaction, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${transaction.namaTransaksi}</td>
                    <td>${transaction.jumlah}</td>
                    <td>${transaction.kategori}</td>
                    <td>${transaction.tanggal}</td>
                    <td><button onclick="deleteTransaction(${index})">Hapus</button></td>
                `;
                tbody.appendChild(row);
            });
        }
    }

    // Hapus transaksi
    window.deleteTransaction = function (index) {
        transactions.splice(index, 1);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        alert("Transaksi berhasil dihapus!");
        window.location.reload();
    };
});

document.getElementById("editProfileButton").addEventListener("click", function() {
    // Buka modal atau tampilkan form untuk mengedit profil
    alert("Fitur Edit Profil sedang dalam pengembangan!");
});
