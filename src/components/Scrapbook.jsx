import React from "react";
import HTMLFlipBook from "react-pageflip";

function Scrapbook({ pages }) {
  const formattedPages =
    pages.length % 2 === 0 ? pages : [...pages, { empty: true }];

  return (
    <div className="flipbook-container">
      {pages.length > 0 ? (
        <HTMLFlipBook
          width={500}
          height={600}
          size="stretch"
          minWidth={300}
          maxWidth={800}
          minHeight={400}
          maxHeight={700}
          maxShadowOpacity={0.7}
          showCover={true}
          drawShadow={true}
          flippingTime={1000}
          className="flipbook"
        >
          {formattedPages.map((memory, index) => (
            <div key={index} className="memory-page">
              {memory.empty ? (
                <div className="empty-page"></div>
              ) : (
                <>
                  <h3 className="memory-text">{memory.title}</h3>
                  <br />
                  {memory.picture && <img src={memory.picture} alt="Memory" />}
                  <br />
                  <p className="memory-text">{memory.message}</p>
                  <p className="memory-text date">
                    <strong>Date:</strong> {memory.date}
                  </p>
                </>
              )}
            </div>
          ))}
        </HTMLFlipBook>
      ) : (
        <p>No memories yet. Start adding some!</p>
      )}
      ;
    </div>
  );
}

export default Scrapbook;
