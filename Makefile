run:
	yarn start

deploy:
	yarn build
	git add .
	git commit -m "Build"
	git push
	cd static && cp ./index.html ./200.html && surge
