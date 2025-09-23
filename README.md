## Gelişmiş REST API Ön Uç(next)

Bu proje, gelişmiş bir REST API'nin ön uç istemcisidir. Next.js, durum yönetimi için Redux Toolkit ve API iletişimi için Axios kullanılarak geliştirilmiştir. Uygulama, kullanıcı kimlik doğrulama (kayıt ve giriş) ve postlar için CRUD (Oluşturma, Okuma, Güncelleme, Silme) işlemlerini yönetir.

## Projenin canlı adresi 
https://nextjs-post-app-advanced-rest-api-f.vercel.app

## Proje Yapısı


````
src/
├── components/
│   ├── Header.jsx
├── containers/
│   ├── HomeContainer.jsx
├── redux/
│   ├── slices/
│   │   ├── authSlice.js  (Kimlik doğrulama durumunu yönetir)
│   │   ├── postSlice.js   (Post ile ilgili durum ve eylemleri yönetir)
│   ├── store.js         (Redux mağazasını yapılandırır)
├── pages/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── page.jsx
│   │   └── register/
│   │       ├── page.jsx
│   └── routes/
│       ├── home/
│       │   ├── page.jsx
│       ├── post/
│       │   ├── create-post/
│       │   │   ├── page.jsx
│       │   ├── edit-post/[id]/
│       │   │   ├── page.jsx
│       │   └── post-detail/[id]/
│       │       ├── page.jsx
├── global.css
├── layout.js
└── main.jsx           ````

## Ön Uç Özellikleri
1. Redux Toolkit ile Durum Yönetimi
Uygulama, öngörülebilir bir veri akışı sağlamak için global durumu yönetmek üzere Redux Toolkit kullanır.

## authSlice.js: 
Bu slice, kullanıcı kimlik doğrulamasından sorumludur. Register ve Login asenkron thunk'larını yönetir, başarılı kimlik doğrulama durumunda kullanıcı nesnesini ve bir JWT token'ı state ve localStorage'da saklar. Ayrıca, kullanıcı verilerini temizlemek için bir logout eylemi içerir.

## postSlice.js: 
Bu slice, postlarla ilgili tüm işlemleri yönetir. Aşağıdaki asenkron thunk'ları içerir:

createTodo: Yeni bir post oluşturur.

fetchPosts: API'den tüm postları getirir.

fetchPostDetails: Tek bir postun ayrıntılarını getirir.

deletePost: Mevcut bir postu siler.

updatePost: Mevcut bir postu günceller.

## 2. Axios ile API İletişimi
Tüm API çağrıları, promise tabanlı bir HTTP istemcisi olan Axios kullanılarak yapılır. Asenkron işlemler, API isteklerini yapma ve farklı durumları (pending, fulfilled, rejected) yönetme sürecini basitleştiren Redux Toolkit'in createAsyncThunk özelliği ile yönetilir.



## Hazırlayan 
Nurullah Mencik
e-mail:nurullahmencik42@gmail.com

