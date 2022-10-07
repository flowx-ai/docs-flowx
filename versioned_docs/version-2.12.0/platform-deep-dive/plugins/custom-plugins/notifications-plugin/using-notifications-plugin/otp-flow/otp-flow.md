# OTP flow

The notifications plugin can also be used for handling the one time password (OTP) generation and validation flow.

The flow is made of two steps, the OTP generation and the OTP validation.

### OTP Configuration

The desired character size and expiration time of the generated one-time-passwords can also be configured following environment variables.

`FLOWX_OTP_LENGTH`

`FLOWX_OTP_EXPIRE_TIME_IN_SECONDS`

Let's go through the examples for both steps:

[generate-otp](generate-otp)

[validate-otp.md](validate-otp)