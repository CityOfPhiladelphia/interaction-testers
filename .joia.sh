joia_install () {
  joia_ssh scripts/user-env.sh
  joia_ssh scripts/install.sh
}

joia_deploy () {
  joia_ssh scripts/deploy.sh
}
