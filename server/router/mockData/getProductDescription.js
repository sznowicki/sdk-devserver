/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const productId = input.productId;

  if (typeof productId === 'undefined') {
    return cb(new Error('productId missing'));
  }

  cb(null, { description: `
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse finibus lectus leo, eget accumsan magna placerat sed. Aliquam ac aliquam magna. Vivamus sit amet varius dolor. Etiam lobortis tortor eu ex congue, vel malesuada lorem porta. Aliquam malesuada mollis massa, vitae tempor felis rhoncus ac. Nullam sed leo auctor, mattis felis vitae, dapibus nisl. Vestibulum vel rhoncus mauris. Cras non dui nec est lacinia euismod ut quis ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris euismod ligula sit amet eleifend consectetur. Maecenas magna lorem, consequat eu nisi et, porttitor scelerisque leo. Sed maximus eget nunc quis vulputate. Praesent finibus arcu nibh. Sed ac luctus tellus. Proin eu libero sit amet elit consequat vestibulum aliquet vel neque. Aliquam placerat neque turpis, sed eleifend quam elementum eu.
    </p>

    <p>
    Donec ultricies nisi eu lectus malesuada, eu porta nulla volutpat. In orci tortor, aliquam eu tincidunt dignissim, imperdiet quis arcu. Vestibulum convallis ultricies orci ac iaculis. Pellentesque nec fermentum erat, ultrices feugiat sapien. Nunc rhoncus lectus risus, sit amet aliquam orci tempus ac. Cras tempus malesuada congue. Sed tellus augue, pulvinar sed fringilla eu, bibendum quis nunc. Proin ac metus at erat rhoncus consequat. Vivamus consectetur, mi facilisis dictum porta, turpis libero aliquet tellus, sit amet dictum eros lacus porttitor ipsum. Aenean nulla ipsum, consectetur in scelerisque vel, pharetra et purus. Donec tempus pulvinar justo eget ullamcorper. Pellentesque sed justo sagittis, venenatis mi ut, dignissim diam. Integer pretium mauris vitae dapibus vulputate. Maecenas faucibus consequat pellentesque.
    </p>

    <p>
    Suspendisse lobortis imperdiet erat, vitae tempor felis dapibus sit amet. Nunc suscipit hendrerit malesuada. Fusce congue malesuada convallis. Suspendisse potenti. Morbi consequat odio eu egestas rutrum. Nam sit amet urna tempor, vehicula turpis quis, congue magna. Ut eu mi accumsan, tincidunt ante sit amet, auctor erat. Nam id metus ac eros semper efficitur a pretium sapien. Phasellus quis diam eget augue eleifend accumsan.
    </p>
  ` });
};
