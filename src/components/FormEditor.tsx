
import React, { useState } from 'react';
import { FormSection, FormItem, SectionTemplate } from '../types';

interface FormEditorProps {
  sections: FormSection[];
  onSectionsChange: (sections: FormSection[]) => void;
  sectionTemplates: SectionTemplate[];
}

const FormEditor: React.FC<FormEditorProps> = ({ 
  sections, 
  onSectionsChange,
  sectionTemplates 
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    const newExpandedSections = new Set(expandedSections);
    if (newExpandedSections.has(sectionId)) {
      newExpandedSections.delete(sectionId);
    } else {
      newExpandedSections.add(sectionId);
    }
    setExpandedSections(newExpandedSections);
  };

  const handleAddSection = () => {
    const newSection: FormSection = {
      id: `section-${Date.now()}`,
      title: 'Новый раздел',
      items: [],
      type: 'checklist',
      order: sections.length,
    };
    onSectionsChange([...sections, newSection]);
    setExpandedSections(new Set(expandedSections).add(newSection.id));
  };

  const handleAddSectionFromTemplate = (template: SectionTemplate) => {
    const newSection: FormSection = {
      id: `section-${Date.now()}`,
      title: template.name,
      items: JSON.parse(JSON.stringify(template.items)), // Deep copy of items
      type: template.type,
      order: sections.length,
    };
    onSectionsChange([...sections, newSection]);
    setExpandedSections(new Set(expandedSections).add(newSection.id));
  };

  const handleSectionTitleChange = (sectionId: string, title: string) => {
    const updatedSections = sections.map(section => 
      section.id === sectionId ? { ...section, title } : section
    );
    onSectionsChange(updatedSections);
  };

  const handleDeleteSection = (sectionId: string) => {
    const updatedSections = sections.filter(section => section.id !== sectionId)
      .map((section, index) => ({ ...section, order: index }));
    onSectionsChange(updatedSections);
    const newExpandedSections = new Set(expandedSections);
    newExpandedSections.delete(sectionId);
    setExpandedSections(newExpandedSections);
  };

  const handleMoveSectionUp = (sectionId: string) => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId);
    if (sectionIndex > 0) {
      const updatedSections = [...sections];
      [updatedSections[sectionIndex - 1], updatedSections[sectionIndex]] = 
        [updatedSections[sectionIndex], updatedSections[sectionIndex - 1]];
      
      // Update order property
      updatedSections.forEach((section, index) => {
        section.order = index;
      });
      
      onSectionsChange(updatedSections);
    }
  };

  const handleMoveSectionDown = (sectionId: string) => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId);
    if (sectionIndex < sections.length - 1) {
      const updatedSections = [...sections];
      [updatedSections[sectionIndex], updatedSections[sectionIndex + 1]] = 
        [updatedSections[sectionIndex + 1], updatedSections[sectionIndex]];
      
      // Update order property
      updatedSections.forEach((section, index) => {
        section.order = index;
      });
      
      onSectionsChange(updatedSections);
    }
  };

  const handleAddItem = (sectionId: string) => {
    const newItem: FormItem = {
      id: `item-${Date.now()}`,
      content: 'Новый пункт',
      type: 'checkbox',
      value: false,
    };
    
    const updatedSections = sections.map(section => 
      section.id === sectionId 
        ? { ...section, items: [...section.items, newItem] } 
        : section
    );
    
    onSectionsChange(updatedSections);
  };

  const handleItemContentChange = (sectionId: string, itemId: string, content: string) => {
    const updatedSections = sections.map(section => {
      if (section.id !== sectionId) return section;
      
      const updatedItems = section.items.map(item => 
        item.id === itemId ? { ...item, content } : item
      );
      
      return { ...section, items: updatedItems };
    });
    
    onSectionsChange(updatedSections);
  };

  const handleItemValueChange = (sectionId: string, itemId: string, value: boolean) => {
    const updatedSections = sections.map(section => {
      if (section.id !== sectionId) return section;
      
      const updatedItems = section.items.map(item => {
        if (item.id === itemId) {
          return { ...item, value };
        }
        return item;
      });
      
      return { ...section, items: updatedItems };
    });
    
    onSectionsChange(updatedSections);
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    const updatedSections = sections.map(section => {
      if (section.id !== sectionId) return section;
      
      const updatedItems = section.items.filter(item => item.id !== itemId);
      
      return { ...section, items: updatedItems };
    });
    
    onSectionsChange(updatedSections);
  };

  const handleAddSubItem = (sectionId: string, parentItemId: string) => {
    const newSubItem: FormItem = {
      id: `subitem-${Date.now()}`,
      content: 'Новый подпункт',
      type: 'checkbox',
      value: false,
    };
    
    const updatedSections = sections.map(section => {
      if (section.id !== sectionId) return section;
      
      const updatedItems = section.items.map(item => {
        if (item.id === parentItemId) {
          const subItems = item.subItems || [];
          return { ...item, subItems: [...subItems, newSubItem] };
        }
        return item;
      });
      
      return { ...section, items: updatedItems };
    });
    
    onSectionsChange(updatedSections);
  };

  const handleSubItemContentChange = (sectionId: string, parentItemId: string, subItemId: string, content: string) => {
    const updatedSections = sections.map(section => {
      if (section.id !== sectionId) return section;
      
      const updatedItems = section.items.map(item => {
        if (item.id === parentItemId && item.subItems) {
          const updatedSubItems = item.subItems.map(subItem => 
            subItem.id === subItemId ? { ...subItem, content } : subItem
          );
          return { ...item, subItems: updatedSubItems };
        }
        return item;
      });
      
      return { ...section, items: updatedItems };
    });
    
    onSectionsChange(updatedSections);
  };

  const handleSubItemValueChange = (sectionId: string, parentItemId: string, subItemId: string, value: boolean) => {
    const updatedSections = sections.map(section => {
      if (section.id !== sectionId) return section;
      
      const updatedItems = section.items.map(item => {
        if (item.id === parentItemId && item.subItems) {
          const updatedSubItems = item.subItems.map(subItem => 
            subItem.id === subItemId ? { ...subItem, value } : subItem
          );
          return { ...item, subItems: updatedSubItems };
        }
        return item;
      });
      
      return { ...section, items: updatedItems };
    });
    
    onSectionsChange(updatedSections);
  };

  const handleDeleteSubItem = (sectionId: string, parentItemId: string, subItemId: string) => {
    const updatedSections = sections.map(section => {
      if (section.id !== sectionId) return section;
      
      const updatedItems = section.items.map(item => {
        if (item.id === parentItemId && item.subItems) {
          const updatedSubItems = item.subItems.filter(subItem => subItem.id !== subItemId);
          return { ...item, subItems: updatedSubItems };
        }
        return item;
      });
      
      return { ...section, items: updatedItems };
    });
    
    onSectionsChange(updatedSections);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-gray-900">Редактор формы</h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleAddSection}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Добавить раздел
          </button>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                id="template-menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Использовать шаблон
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="template-menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                {sectionTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleAddSectionFromTemplate(template)}
                    className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Нет разделов</h3>
          <p className="mt-1 text-sm text-gray-500">
            Создайте новый раздел или используйте шаблон
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div 
                className="px-4 py-5 sm:px-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex-1">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionTitleChange(section.id, e.target.value)}
                    className="block w-full text-lg font-medium text-gray-900 border-0 focus:ring-0 focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Название раздела"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveSectionUp(section.id);
                    }}
                    disabled={section.order === 0}
                    className={`p-1 rounded-full hover:bg-gray-100 ${
                      section.order === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'
                    }`}
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveSectionDown(section.id);
                    }}
                    disabled={section.order === sections.length - 1}
                    className={`p-1 rounded-full hover:bg-gray-100 ${
                      section.order === sections.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'
                    }`}
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSection(section.id);
                    }}
                    className="p-1 text-red-500 rounded-full hover:bg-red-50"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(section.id);
                    }}
                    className="p-1 text-gray-500 rounded-full hover:bg-gray-100"
                  >
                    {expandedSections.has(section.id) ? (
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {expandedSections.has(section.id) && (
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-md p-3">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 pt-1">
                            <input
                              type="checkbox"
                              checked={item.value as boolean || false}
                              onChange={(e) => handleItemValueChange(section.id, item.id, e.target.checked)}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={item.content}
                              onChange={(e) => handleItemContentChange(section.id, item.id, e.target.value)}
                              className="block w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                              placeholder="Содержание пункта"
                            />
                            
                            {/* Sub-items section */}
                            {item.subItems && item.subItems.length > 0 && (
                              <div className="mt-2 ml-5 space-y-2">
                                {item.subItems.map((subItem) => (
                                  <div key={subItem.id} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 pt-1">
                                      <input
                                        type="checkbox"
                                        checked={subItem.value as boolean || false}
                                        onChange={(e) => handleSubItemValueChange(
                                          section.id, 
                                          item.id, 
                                          subItem.id, 
                                          e.target.checked
                                        )}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <input
                                        type="text"
                                        value={subItem.content}
                                        onChange={(e) => handleSubItemContentChange(
                                          section.id,
                                          item.id,
                                          subItem.id,
                                          e.target.value
                                        )}
                                        className="block w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                        placeholder="Содержание подпункта"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteSubItem(section.id, item.id, subItem.id)}
                                      className="p-1 text-red-500 rounded-full hover:bg-red-50"
                                    >
                                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="mt-2">
                              <button
                                type="button"
                                onClick={() => handleAddSubItem(section.id, item.id)}
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Добавить подпункт
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(section.id, item.id)}
                            className="p-1 text-red-500 rounded-full hover:bg-red-50"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => handleAddItem(section.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Добавить пункт
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormEditor;
