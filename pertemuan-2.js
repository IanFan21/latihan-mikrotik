/* Fragmen Pertemuan 2 — dimuat halaman utama HANYA setelah gerbang tanggal
   (Rabu, 28 Oktober 2026, waktu online) terverifikasi terbuka.
   File ini sengaja terpisah agar materi & kuis Pertemuan 2 tidak ada
   di dalam file halaman utama. */
window.__P2_HTML = `
        <div class="grid2" style="margin-bottom:18px">
          <div class="card">
            <h3 style="font-size:17px;margin-bottom:12px">Tujuan Pembelajaran</h3>
            <ul class="tujuan">
              <li>Membuat Bridge dan memindahkan IP LAN + DHCP Server ke bridge tanpa memutus jaringan.</li>
              <li>Mengaktifkan Wireless mode AP Bridge dengan Security Profile WPA2.</li>
              <li>Menjalankan Hotspot Setup dan membuat user hotspot lokal.</li>
              <li>Membuat Simple Queue dan aturan Firewall Filter dasar (input &amp; forward).</li>
              <li>Mengganti password admin, menambah user terbatas, dan membackup konfigurasi.</li>
            </ul>
          </div>
          <div class="card">
            <h3 style="font-size:17px;margin-bottom:12px">Konsep yang Wajib Paham</h3>
            <ul class="tujuan">
              <li><b>Bridge</b> menggabungkan banyak interface jadi satu segmen. Setelah interface masuk bridge, IP dan DHCP dipasang di <i>bridge</i>-nya, bukan di ether satu-satu.</li>
              <li><b>Chain input</b> = paket yang tujuannya router itu sendiri. <b>Chain forward</b> = paket yang hanya lewat router menuju klien/internet. Salah chain = aturan tidak pernah bekerja.</li>
              <li><b>Urutan aturan Firewall dibaca dari atas ke bawah</b> — aturan pertama yang cocok langsung menentukan nasib paket.</li>
              <li><b>Backup</b> (.backup) menyimpan konfigurasi utuh untuk restore di router yang sama; <b>Export</b> (.rsc) menyimpan perintah teks yang bisa dibaca &amp; diedit manusia.</li>
            </ul>
          </div>
        </div>

        <div class="card" style="margin-bottom:18px">
          <h3 style="font-size:18px;margin-bottom:4px">Langkah Praktik Pertemuan 2</h3>
          <p style="font-size:14px;color:var(--ink-soft)">Melanjutkan konfigurasi Pertemuan 1. Untuk latihan mandiri, ganti SSID, password, dan limit dengan nilai dari kartu parametermu.</p>
          <ol class="steps">
            <li><span class="no"></span><div>
              <h4>Buat Bridge untuk sisi LAN</h4>
              <p>Klik <b>+</b>, Name <span class="mono">bridge1</span>. Lalu tab <b>Ports</b> → <b>+</b> → masukkan <span class="mono">ether2</span> dan <span class="mono">ether3</span> ke bridge1. Sekarang kedua port itu satu jaringan — klien di ether2 bisa “melihat” klien di ether3.</p>
              <p class="path"><span class="seg">Bridge</span><span class="arr">→</span><span class="seg">+</span><span class="arr">→</span><span class="seg">Name: bridge1</span><span class="arr">→</span><span class="seg">tab Ports</span><span class="arr">→</span><span class="seg">+ ether2, ether3</span></p>
            </div></li>
            <li><span class="no"></span><div>
              <h4>Pindahkan IP LAN &amp; DHCP ke Bridge</h4>
              <p>Ubah IP <span class="mono">192.168.88.1/24</span> dari ether2 menjadi interface <span class="mono">bridge1</span>, dan ubah juga interface DHCP Server menjadi <span class="mono">bridge1</span>. Melewatkan langkah ini adalah penyebab klasik “setelah bikin bridge, klien tidak dapat IP lagi”.</p>
              <p class="path"><span class="seg">IP</span><span class="arr">→</span><span class="seg">Addresses</span><span class="arr">→</span><span class="seg">ubah Interface → bridge1</span><span class="arr">·</span><span class="seg">IP</span><span class="arr">→</span><span class="seg">DHCP Server</span><span class="arr">→</span><span class="seg">ubah Interface → bridge1</span></p>
            </div></li>
            <li><span class="no"></span><div>
              <h4>Buat password WiFi dulu (Security Profile)</h4>
              <p>Tab <b>Security Profiles</b> → <b>+</b> → Name <span class="mono">profil-lab</span>, Mode <span class="mono">dynamic keys</span>, centang <b>WPA2 PSK</b>, isi WPA2 Pre-Shared Key minimal 8 karakter. Urutannya memang profile dulu, baru ditempel ke radio.</p>
              <p class="path"><span class="seg">Wireless</span><span class="arr">→</span><span class="seg">tab Security Profiles</span><span class="arr">→</span><span class="seg">+</span><span class="arr">→</span><span class="seg">WPA2 PSK + password</span></p>
            </div></li>
            <li><span class="no"></span><div>
              <h4>Hidupkan WiFi sebagai Access Point</h4>
              <p>Double-click <span class="mono">wlan1</span> → centang <b>Enabled</b> → Mode <span class="mono">ap bridge</span>, Band <span class="mono">2GHz-B/G/N</span>, SSID isi nama jaringanmu, Security Profile pilih <span class="mono">profil-lab</span>. Lalu masukkan wlan1 sebagai port bridge1 agar pengguna WiFi satu jaringan dengan klien kabel.</p>
              <p class="path"><span class="seg">Wireless</span><span class="arr">→</span><span class="seg">wlan1</span><span class="arr">→</span><span class="seg">Enabled ✓ · Mode: ap bridge</span><span class="arr">→</span><span class="seg">SSID + Security Profile</span><span class="arr">→</span><span class="seg">Bridge → Ports → + wlan1</span></p>
            </div></li>
            <li><span class="no"></span><div>
              <h4>Jalankan Hotspot Setup</h4>
              <p>Klik <b>Hotspot Setup</b>: Hotspot Interface <span class="mono">bridge1</span> → Local Address <span class="mono">192.168.88.1/24</span> → Address Pool biarkan mengikuti DHCP → Certificate <span class="mono">none</span> → SMTP Server kosongkan → DNS Name isi misalnya <span class="mono">lab.net</span> → buat user admin hotspot pertama. Setelah aktif, klien yang membuka browser akan dilempar ke halaman login.</p>
              <p class="path"><span class="seg">IP</span><span class="arr">→</span><span class="seg">Hotspot</span><span class="arr">→</span><span class="seg">Hotspot Setup</span><span class="arr">→</span><span class="seg">Interface: bridge1</span><span class="arr">→</span><span class="seg">DNS Name: lab.net</span></p>
            </div></li>
            <li><span class="no"></span><div>
              <h4>Buat user hotspot untuk klien</h4>
              <p>Tab <b>Users</b> → <b>+</b> → Name &amp; Password untuk klien, Profile <span class="mono">default</span>. Bedakan dengan user Winbox: user hotspot hanya untuk login internet dari halaman captive portal, <b>bukan</b> untuk masuk Winbox.</p>
              <p class="path"><span class="seg">IP</span><span class="arr">→</span><span class="seg">Hotspot</span><span class="arr">→</span><span class="seg">tab Users</span><span class="arr">→</span><span class="seg">+ user baru</span></p>
            </div></li>
            <li><span class="no"></span><div>
              <h4>Batasi bandwidth dengan Simple Queue</h4>
              <p>Klik <b>+</b>: Name <span class="mono">Limit-Klien</span>, Target isi IP klien (mis. <span class="mono">192.168.88.10</span>), Max Limit Upload <span class="mono">2M</span> / Download <span class="mono">5M</span>. Queue membuat satu klien rakus tidak menyedot habis bandwidth satu lab.</p>
              <p class="path"><span class="seg">Queues</span><span class="arr">→</span><span class="seg">Simple Queues</span><span class="arr">→</span><span class="seg">+</span><span class="arr">→</span><span class="seg">Target + Max Limit</span></p>
            </div></li>
            <li><span class="no"></span><div>
              <h4>Amankan router dengan Firewall Filter</h4>
              <p>Buat tiga aturan dengan urutan persis seperti ini — ingat, dibaca dari atas:</p>
              <ul>
                <li><span class="mono">chain=input, connection-state=established,related → accept</span> (balasan koneksi yang sah)</li>
                <li><span class="mono">chain=input, in-interface=bridge1 → accept</span> (admin dari LAN boleh masuk)</li>
                <li><span class="mono">chain=input → drop</span> (sisanya, termasuk dari internet, ditolak)</li>
              </ul>
              <p class="path"><span class="seg">IP</span><span class="arr">→</span><span class="seg">Firewall</span><span class="arr">→</span><span class="seg">tab Filter Rules</span><span class="arr">→</span><span class="seg">+ tiga aturan berurutan</span></p>
            </div></li>
            <li><span class="no"></span><div>
              <h4>Kunci akun &amp; selamatkan konfigurasi</h4>
              <p>Ganti password user <span class="mono">admin</span>, buat user baru grup <span class="mono">read</span> untuk asisten/guru tamu. Terakhir backup: menu Files → <b>Backup</b>, dan export teks lewat terminal. Dua-duanya disimpan — beda format, beda kegunaan.</p>
              <div class="term"><span class="dim">[admin@MikroTik] &gt;</span> /system backup save name=backup-lab<br><span class="dim">[admin@MikroTik] &gt;</span> /export file=config-lab<br><span class="dim">[admin@MikroTik] &gt;</span> /file print <span class="grn">→ backup-lab.backup &amp; config-lab.rsc muncul di daftar file</span></div>
              <p class="path" style="margin-top:8px"><span class="seg">System</span><span class="arr">→</span><span class="seg">Users</span><span class="arr">·</span><span class="seg">Files</span><span class="arr">→</span><span class="seg">Backup</span></p>
            </div></li>
          </ol>
        </div>

        <div class="quiz" id="quiz2" style="margin-bottom:18px"></div>

        <div class="card tugas">
          <div class="tugas-head">
            <h3 style="font-size:19px">Tugas Pertemuan 2 — “Boss Level: Warnet Mini”</h3>
            <span class="badge">TOTAL 100 POIN</span>
          </div>
          <p style="font-size:14.5px;color:var(--ink-soft)">Skenario: Kamu diminta membangun jaringan warnet mini “<b data-tpl="ssid">TJKT-Lab</b>” dari router yang sudah berjalan di Pertemuan 1. Ada 6 PC kabel dan WiFi untuk HP pelanggan. Semua nilai khas (SSID, password WiFi, user hotspot, limit) wajib dari kartu parametermu.</p>
          <ol id="tugas2List">
            <li><b>Rancangan di Atas Kertas (20 poin).</b> Buat tabel rancangan berisi: nama bridge, interface apa saja yang jadi port-nya, SSID punyamu, nama security profile, DNS name hotspot, username hotspot pelanggan, dan limit queue pelanggan. Jelaskan dalam 2–3 kalimat kenapa IP LAN dan DHCP Server harus <i>pindah</i> ke bridge — bukan tetap di ether2.</li>
            <li><b>Urutan Eksekusi Anti-Putus (25 poin).</b> Susun urutan langkah konfigurasi lengkap dari “router masih konfigurasi Pertemuan 1” sampai “HP pelanggan bisa login hotspot dan internetan”. Beri nomor dan jalur menu tiap langkah. <b>Jebakan:</b> ada satu langkah yang kalau dilakukan terlalu awal akan memutus akses Winbox-mu sendiri — temukan langkah itu, tandai, dan jelaskan cara aman melakukannya.</li>
            <li><b>Hitung Keadilan Bandwidth (20 poin).</b> Bandwidth warnet hanya 20 Mbps untuk 6 PC. Dengan limit download dari kartu parametermu, hitung: (a) total kebutuhan maksimum bila semua PC menarik limit penuh, (b) apakah melebihi 20 Mbps, (c) bila melebihi, berapa limit baru yang adil per PC dan tunjukkan cara hitungmu. Angka tanpa cara hitung tidak dinilai.</li>
            <li><b>Firewall: Benar atau Jebakan? (20 poin).</b> Temanmu membuat aturan: <span class="mono">chain=forward, in-interface=ether1, action=drop</span> ditaruh paling atas, dan mengeluh “setelah itu semua klien tidak bisa internet”. Jelaskan kenapa aturan itu membunuh seluruh trafik klien, lalu tuliskan susunan 3 aturan input yang benar dari materi (dengan chain, syarat, dan action) untuk mengamankan router tanpa mematikan internet klien.</li>
            <li><b>Refleksi Teknisi (15 poin).</b> Tulis 5–8 kalimat dengan bahasamu sendiri: dari seluruh dua pertemuan, konfigurasi apa yang menurutmu paling mudah merusak jaringan bila salah satu langkah saja keliru, dan kebiasaan apa yang akan kamu lakukan untuk mencegahnya saat praktik dengan router asli nanti. Jawaban umum seperti “harus teliti” tanpa menyebut konfigurasi spesifik tidak mendapat poin.</li>
          </ol>
          <div style="display:flex;gap:12px;align-items:center;margin-top:16px;flex-wrap:wrap">
            <button class="copy-btn" type="button" data-copy="tugas2">Salin Tugas 2 + Parameterku</button>
            <span class="copy-msg" data-copymsg></span>
          </div>
        </div>`;

window.__initP2 = function (kit) {
  var gloss = document.getElementById("glossList");
  if (gloss) {
    var extra = [
      ["Bridge", "Menggabungkan beberapa interface menjadi satu segmen jaringan yang sama."],
      ["SSID", "Nama jaringan WiFi yang terlihat saat perangkat mencari jaringan."],
      ["Security Profile", "Pengaturan keamanan WiFi: mode enkripsi (WPA2) dan password-nya."],
      ["Hotspot", "Sistem login lewat halaman web (captive portal) sebelum klien boleh internetan."],
      ["Simple Queue", "Pembatas kecepatan upload/download untuk target IP atau jaringan tertentu."],
      ["Chain Input", "Aturan firewall untuk paket yang tujuannya adalah router itu sendiri."],
      ["Chain Forward", "Aturan firewall untuk paket yang hanya melewati router menuju klien/internet."],
      ["Backup / Export", "Backup = salinan biner konfigurasi utuh. Export = salinan perintah teks (.rsc) yang bisa dibaca manusia."]
    ];
    gloss.innerHTML += extra.map(function (e) { return "<div><dt>" + e[0] + "</dt><dd>" + e[1] + "</dd></div>"; }).join("");
  }
  var QUIZ2 = [
    {
      sd: { prefix: 25 },
      ask: "Jaringan bridge untuk tamu dibuat dengan prefix <span class='mono'>/25</span>. Berapa alamat usable untuk host di segmen itu?",
      options: [
        { t: "128 alamat", v: "128" },
        { t: "126 alamat", v: "126" },
        { t: "124 alamat", v: "124" },
        { t: "254 alamat", v: "254" }
      ],
      check: function (sd, v) { return parseInt(v, 10) === kit.usableHosts(sd.prefix); },
      why: function (sd) { return "/25 menyisakan 7 bit host → 2^7 = 128 total, dikurangi network & broadcast = " + kit.usableHosts(sd.prefix) + " usable. Angka 254 itu jawaban untuk /24."; }
    },
    {
      sd: { clients: 6, perClient: 6, total: 20 },
      ask: "Warnet punya bandwidth <b>20 Mbps</b> untuk <b>6 PC</b>. Tiap PC diberi Simple Queue download <b>6 Mbps</b>. Bila semua PC menarik limit penuh bersamaan, kelebihan beban terhadap bandwidth yang tersedia adalah…",
      options: [
        { t: "36 Mbps", v: "36" },
        { t: "26 Mbps", v: "26" },
        { t: "16 Mbps", v: "16" },
        { t: "Tidak ada kelebihan", v: "0" }
      ],
      check: function (sd, v) { return parseInt(v, 10) === sd.clients * sd.perClient - sd.total; },
      why: function (sd) { return "Kebutuhan maksimum = 6 × 6 = " + (sd.clients * sd.perClient) + " Mbps. Dikurangi kapasitas " + sd.total + " Mbps → kelebihan " + (sd.clients * sd.perClient - sd.total) + " Mbps. Karena itu limit per klien harus dihitung dari kapasitas, bukan ditebak."; }
    },
    {
      sd: {},
      ask: "Dari empat aturan firewall berikut, mana yang wajib ditaruh <b>paling bawah</b> sebagai penutup pengamanan router?",
      options: [
        { t: "chain=input · connection-state=established,related · accept", v: "input|est|accept", mono: true },
        { t: "chain=input · in-interface=bridge1 · accept", v: "input|lan|accept", mono: true },
        { t: "chain=forward · tanpa syarat · drop", v: "forward|any|drop", mono: true },
        { t: "chain=input · tanpa syarat tambahan · drop", v: "input|any|drop", mono: true }
      ],
      check: function (sd, v) { var p = v.split("|"); return p[0] === "input" && p[1] === "any" && p[2] === "drop"; },
      why: function () { return "Penutup yang benar: chain=input tanpa syarat dengan action=drop — semua paket menuju router yang tidak diterima aturan di atasnya dibuang. Versi chain=forward akan membuang trafik klien yang hanya lewat router, dan internet satu jaringan mati."; }
    },
    {
      sd: { start: 100, end: 199 },
      ask: "Address pool hotspot diatur dari <span class='mono'>192.168.88.100</span> sampai <span class='mono'>192.168.88.199</span>. Berapa alamat yang tersedia untuk tamu?",
      options: [
        { t: "99 alamat", v: "99" },
        { t: "100 alamat", v: "100" },
        { t: "101 alamat", v: "101" },
        { t: "199 alamat", v: "199" }
      ],
      check: function (sd, v) { return parseInt(v, 10) === sd.end - sd.start + 1; },
      why: function (sd) { return "Jumlah alamat inklusif = akhir − awal + 1 = 199 − 100 + 1 = " + (sd.end - sd.start + 1) + ". Lupa +1 adalah kesalahan hitung pool yang paling umum."; }
    },
    {
      sd: { ip: "192.168.88.200", prefix: 25 },
      ask: "Sebuah HP pelanggan WiFi mendapat alamat <span class='mono'>192.168.88.200/25</span>. HP itu berada di segmen network…",
      options: [
        { t: "192.168.88.0", v: "192.168.88.0" },
        { t: "192.168.88.64", v: "192.168.88.64" },
        { t: "192.168.88.128", v: "192.168.88.128" },
        { t: "192.168.88.192", v: "192.168.88.192" }
      ],
      check: function (sd, v) { return v === kit.networkOf(sd.ip, sd.prefix); },
      why: function (sd) { return "/25 membagi oktet terakhir per 128: blok .0 dan .128. Alamat .200 masuk blok kedua, network-nya " + kit.networkOf(sd.ip, sd.prefix) + " — bukan .192 (itu pola pikir /26)."; }
    },
    {
      sd: { limit: "2M/5M" },
      ask: "Simple Queue sebuah klien diatur Max Limit <span class='mono'>2M/5M</span> (format RouterOS: upload/download). Saat klien mengunggah file besar ke internet, kecepatan maksimum unggahnya adalah…",
      options: [
        { t: "2 Mbps", v: "2" },
        { t: "5 Mbps", v: "5" },
        { t: "7 Mbps", v: "7" },
        { t: "10 Mbps", v: "10" }
      ],
      check: function (sd, v) { return parseInt(v, 10) === parseInt(sd.limit.split("/")[0], 10); },
      why: function (sd) { return "Angka pertama pada pasangan max-limit adalah upload: " + sd.limit.split("/")[0] + " untuk upload, " + sd.limit.split("/")[1] + " untuk download. Tertukar membaca urutan ini membuat laporan praktikmu salah arah."; }
    }
  ];
  kit.renderQuiz(document.getElementById("quiz2"), QUIZ2, "Kuis Pertemuan 2 — Kasus & Hitungan");
};
