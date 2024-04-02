FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 as build 
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["API.csproj", "./"] 
RUN dotnet restore "./API.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish 
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "API.csproj" -c $BUILD_CONFIGURATION -o /app/publish 

FROM base AS final
RUN apt-get update && apt-get install libgssapi-krb5-2 -y
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT [ "dotnet", "API.dll", "--no-launch-profile" ]