const AddOrEditBookTexts = {
  addBook: 'Kitap Ekle',
  author: 'Kitap Yazarı',
  bookCover: 'Kitap Kapağı',
  description: 'Kitap Tanımı',
  genre: 'Kitap türü',
  isbn: 'ISBN Numarası',
  name: 'Kitap Adı',
  saveChanges: 'Değişiklikleri Kaydet',
  uploadFromDevice: 'Cihazdan Yükle',
  uploadFromCamera: 'Kamera ile  yükle',
};

const DashboardTexts = {
  admin: 'Admin',
  guest: 'Misafir Kullanıcı',
  hello: 'Merhaba',
  whatAreYouSearch: 'Ne aramıştınız?',
};

const Labels = {
  eMail: 'E-mail',
  login: 'Giriş Yap',
  signUp: 'Kayıt Ol',
  password: 'Şifre',
  userName: 'Kullanıcı Adı',
};

const SearchBarTexts = {
  increase: 'A-Z Sırala',
  decrease: 'Z-A Sırala',
};

const SignUpTexts = {
  continueWithAdmin: 'Admin olarak devam etmek istiyorum.',
};

export default {
  back: 'Geri',
  ...AddOrEditBookTexts,
  ...DashboardTexts,
  ...Labels,
  ...SearchBarTexts,
  ...SignUpTexts,
};
