# User

## Register

```
POST /api/v1/users/register
```

## Login

```
POST /api/v1/users/login
```

## Update Profile

```
PATCH /api/v1/users/me

PATCH /api/v1/users/me/update-password
```

## Followings

```
Get User's Followings:
/api/v1/users/{{userId}}/followings

Add Following:
POST /api/v1/followings

Delete Following:
DELETE /api/v1/followings/{{followingId}}
```

## Favorites

```
Get User's Favorites:
/api/v1/users/{{userId}}/favorites

Create Favorite:
POST /api/v1/favorites

Delete Favorite:
DELETE /api/v1/favorites/{{favoriteId}}
```

## Comment

```
Create Comment:
POST /api/v1/comments

Delete Comment:
DELETE /api/v1/comments/{{commentId}}
```

# Merchant

## Register

```
POST /api/v1/merchants/register
```

## Login

```
POST /api/v1/merchants/login
```

## Update Profile

```
PATCH /api/v1/merchants/me

PATCH /api/v1/merchants/me/update-password
```

## Products

```
Get Merchant's Products:
GET /api/v1/merchants/{{merchantId}}

Create Product:
POST /api/v1/products

Update Product:
PATCH /api/v1/products/{{productId}}

Delete Product:
DELETE /api/v1/products/{{productId}}
```
