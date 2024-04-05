export async function getLocaleProps(context) {
  const locale = context.locale; // Fetch the locale from context

  return {
    props: {
      locale,
    },
  };
}
 