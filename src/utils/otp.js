// utils/otp.js


  const verifyOTP = async (otpTime) => {
  try {
    const cDateTime = new Date();
    let differenceValue = (otpTime - cDateTime.getTime()) / 1000;
    differenceValue /= 60;
    const minutes = Math.abs(differenceValue);
    if (minutes > 2) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};
export default verifyOTP
