import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Đã kết nối thành công đến database!');
  } catch (error) {
    console.error('Lỗi kết nối đến database: ', error.message);
    process.exit(1); // Thoát với mã lỗi 1
  }
}

export default connectToDatabase;
