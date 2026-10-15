<div align="center">

# ⚡ Kanto Companion

### คู่มือ Pokémon: Let's Go, Pikachu! ภาษาไทย / English

<a href="https://ampsoria.github.io/Pokemon-LetsGo-Pikachu-GuideWeb/">
  <img src="docs/assets/readme-open-guide.svg" alt="เปิดเว็บไกด์ Pokémon: Let's Go, Pikachu! / Open the live guide" width="420">
</a>

<br>

<img src="docs/assets/pikachu-art.png" alt="ภาพประกอบพิคาชู" width="220">

**Pokédex · Gyms · Type Matchups · Walkthrough · Items · TMs · Ride Pokémon**

</div>

---

เว็บคู่มือแฟนเมดสำหรับออกผจญภัยในคันโต เปิดอ่านได้ทั้งภาษาไทยและอังกฤษบนมือถือหรือคอมพิวเตอร์ ไม่ต้องสมัครสมาชิกหรือเข้าสู่ระบบ

## มีอะไรในเว็บ

| หมวด | รายละเอียด |
| --- | --- |
| **Pokédex** | ค้นหาโปเกมอน กดดูรายละเอียด และเลือกเลเวลปัจจุบันกับเลเวลเป้าหมายเพื่อดูท่าที่เรียนได้แล้วและท่าที่กำลังจะได้รับ |
| **ยิมและจตุรเทพ** | หัวหน้ายิมทั้ง 8 คน ทีมที่ใช้ เคล็ดลับการต่อสู้ และเส้นทางสู่ Elite Four |
| **ตัวช่วยธาตุ** | เลือกธาตุฝ่ายรับเพื่อหาท่าโจมตีที่เหมาะ หรือเลือกธาตุท่าโจมตีเพื่อดูว่าได้ผลกับโปเกมอนธาตุใด พร้อมตัวคูณ ×4 ถึง ×0 |
| **เนื้อเรื่องและปริศนา** | ลำดับการเดินทาง จุดสำคัญ เทคนิคผ่านพัซเซิล และ Easter eggs |
| **ไอเท็มและ TM** | Poké Ball, ยา, ลูกกวาด, ไอเท็มเดินทาง และ TM 01–60 พร้อมรายละเอียด วิธีรับ และราคาที่ตรวจสอบได้ |
| **โปเกมอนขี่** | โปเกมอนที่ขี่ได้ 18 ตัว วิธีรับ และเงื่อนไขการขี่บนบก ในน้ำ และบนฟ้า |

> **English GitHub description:** A Thai–English Pokémon: Let's Go, Pikachu! guide with a Kanto Pokédex, gyms, type matchups, items, TMs, ride Pokémon, and walkthroughs.

## เปิดดูในเครื่อง

ต้องรันผ่านเว็บเซิร์ฟเวอร์เล็ก ๆ เพื่อให้เบราว์เซอร์โหลดข้อมูล Pokédex ได้:

```sh
python3 -m http.server 8765 --directory docs
```

จากนั้นเปิด <http://localhost:8765/> การเปิดไฟล์ `docs/index.html` โดยตรงด้วย `file://` อาจทำให้ `pokedex.json` โหลดไม่ได้

## เผยแพร่บน GitHub Pages

ไฟล์เว็บอยู่ใน [`docs/`](docs/) ทั้งหมด และใช้ relative paths จึงรองรับ URL ของ GitHub Pages สำหรับ repository นี้ได้โดยตรง

1. ไปที่ **Settings → Pages → Build and deployment** ของ repository
2. เลือก **Source: Deploy from a branch**
3. เลือก **Branch: main**, **Folder: /docs** แล้วกด **Save**

เมื่อ GitHub Pages เผยแพร่เสร็จ ปุ่มด้านบนจะเปิดเว็บที่ <https://ampsoria.github.io/Pokemon-LetsGo-Pikachu-GuideWeb/> โดยไม่ต้องใช้ GitHub Actions หรือ backend

## ข้อมูลและเครดิต

- ข้อมูล Pokédex และท่า: [PokéAPI](https://pokeapi.co/docs/v2) · ภาพโปเกมอน: [PokéAPI Sprites](https://github.com/PokeAPI/sprites)
- ภาพหน้าจอยิมจากเกม Nintendo Switch: [Serebii Gyms](https://www.serebii.net/letsgopikachueevee/gyms.shtml)
- ข้อมูล [ไอเท็ม](https://www.serebii.net/letsgopikachueevee/items.shtml), [TM](https://www.serebii.net/letsgopikachueevee/tms.shtml), [ลูกกวาด](https://www.serebii.net/letsgopikachueevee/candy.shtml) และ [โปเกมอนขี่](https://www.serebii.net/letsgopikachueevee/followingride.shtml): Serebii · จุดรับ [TM](https://pokemondb.net/lets-go-pikachu-eevee/tms): Pokémon Database · [ราคาในร้าน](https://gamefaqs.gamespot.com/switch/240025-pokemon-lets-go-pikachu/faqs/76631/celadon-city): GameFAQs

เว็บไซต์นี้เป็นผลงานแฟนเมด Pokémon และตัวละครทั้งหมดเป็นทรัพย์สินของเจ้าของลิขสิทธิ์เดิม
