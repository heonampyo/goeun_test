import fs from 'fs';
import path from 'path';

const EmbedPage = () => {
  const htmlPath = path.resolve(process.cwd(), 'public', 'embed.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default EmbedPage;
