module.exports = {
  devServer: {
    compress: true,
    inline: true,
    port: 8080,
    public: process.env.VUE_APP_PUBLIC
    // public:
    //   "122383a581114da9bc8fab766c8bc512.vfs.cloud9.us-east-2.amazonaws.com"
  },
  transpileDependencies: ["@vue/devtools"],
  configureWebpack: {
    devtool: "source-map"
  }
};
