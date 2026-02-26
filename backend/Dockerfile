# ---------- BUILD STAGE ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ca_backend/ca_backend.csproj ca_backend/
RUN dotnet restore ca_backend/ca_backend.csproj

COPY ca_backend/. ca_backend/

WORKDIR /src/ca_backend
RUN dotnet publish -c Release -o /app/publish


# ---------- RUNTIME STAGE ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5000

EXPOSE 5000

ENTRYPOINT ["dotnet","ca_backend.dll"]
