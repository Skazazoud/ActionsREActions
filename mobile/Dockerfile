FROM openjdk:8

WORKDIR /mobile

COPY ./ ./

RUN chmod +x gradlew

RUN ./gradlew assembleRelease

RUN mv /app/build/outputs/apk/release/app-release-unsigned.apk ../client.apk