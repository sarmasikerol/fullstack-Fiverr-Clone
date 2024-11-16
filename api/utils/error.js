// aldığı parametrelere göre hata mw'ne gönderilmek üzere bir error nesnesi oluşturucak
const error = (status, message) => {
  // bir err nesnesi oluştur
  const err = new Error();

  // hata nesnesini güncelle
  err.message = message;
  err.status = status;

  // hata nesnesini döndür
  return err;
};

export default error;
