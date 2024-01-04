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
  continueWithAdmin: 'Admin olarak devam et',
  continueWithGuest: 'Misafir olarak devam et',
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
  alreadySignUp: 'Bu e-mail adresi kullanılmaktadır',
  alreadyAdded: 'Bu isbn kullanılıyor',
  back: 'Geri',
  emptyField: 'Lütfen gerekli bilgileri doldurunuz',
  invalidLogin: 'Yanlış şifre veya e-mail girişi',
  notEdited: 'Kitap düzenlenemedi',
  ...AddOrEditBookTexts,
  ...DashboardTexts,
  ...Labels,
  ...SearchBarTexts,
  ...SignUpTexts,
};
