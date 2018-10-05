insert into accounts
(account_username, account_password)
values
(${username}, ${password})
returning accounts.account_id , accounts.account_username