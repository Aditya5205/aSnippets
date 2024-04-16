rm -rf extension extension.zip
cp -r public extension 
cd extension
 
declare -A scripts0=(
    [file]='flowbite.min.js'
    [url]='https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js'
)

declare -n scripts
for scripts  in ${!scripts@}; do
  curl ${scripts[url]} -o ${scripts[file]}
  sed -i"" -e "s|${scripts[url]}|${scripts[file]}|g" index.html
done

zip -r extension.zip *
mv extension.zip ../